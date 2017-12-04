const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { getTestCaseOutcomes, wrapTestfile, getPythonTestCaseOutcomes } = require('./algorithm-execution-util')
const tmp = require('tmp')

module.exports = router

router.post('/javascript', (req, res, next) => {
  req.body.algorithmContent =
    req.body.algorithmContent +
    `\n module.exports = {${req.body.question.functionName}}`

  console.log("ALGORITHM WRAPPED CONTENT", req.body.algorithmContent)

  let wrappedTestFile = wrapTestfile(
    req.body.question.javascriptTestFile,
    req.body.question.functionName
  )

  const createAlgorithmTestTempDirectory = () =>
    new Promise((resolve, reject) => {
      tmp.dir(
        {
          unsafeCleanup: true,
          prefix: 'test_',
          dir: path.join(__dirname, '..', 'algorithm_input_test')
        },
        (err, tmpPath, cleanupCB) => {
          if (err) {
            reject(err)
            return next(err)
          }
          resolve([tmpPath, cleanupCB])
        }
      )
    })

  const createAlgorithmInputFile = (algorithmInput, tempDirectory) =>
    new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(tempDirectory, 'algorithm-input.js'),
        algorithmInput,
        err => {
          if (err) {
            reject(err)
            return next(err)
          }
          resolve()
        }
      )
    })

  const createAlgorithmTestFile = (algorithmTest, tempDirectory) =>
    new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(tempDirectory, 'algorithm-test.js'),
        algorithmTest,
        err => {
          if (err) {
            reject(err)
            return next(err)
          }
          resolve()
        }
      )
    })

    ; (async function (algorithmInput, algorithmTest) {
      const [
        algorithmTestTempDirectory,
        cleanupCB
      ] = await createAlgorithmTestTempDirectory()

      const algorithmTestFile = createAlgorithmTestFile(
        algorithmTest,
        algorithmTestTempDirectory
      )

      const algorithmInputFile = createAlgorithmInputFile(
        algorithmInput,
        algorithmTestTempDirectory
      )

      return [
        algorithmTestTempDirectory,
        cleanupCB,
        await algorithmInputFile,
        await algorithmTestFile
      ]

    })(req.body.algorithmContent, wrappedTestFile)
      .then(([algorithmTestTempDirectory, cleanupCB]) => {
        exec(
          `npm run test-javascript-algorithm-input ./server/algorithm_input_test${algorithmTestTempDirectory.slice(
            algorithmTestTempDirectory.lastIndexOf('/')
          )}/algorithm-test.js`,
          { timeout: 5000 },
          (err, stdout, stderr) => {

            try {
              cleanupCB()
              console.log('STDOUT_____________', stdout, '___________STDOUT')
              console.log('STDERR_____________', stderr, '___________STDERR')
              console.log('ERR_____________', err, '___________ERR')

              const { testCasesStr, revisedStdoutStr } = getTestCaseOutcomes(
                stdout
              )
              console.log("_________AFTER GET TEST CASE OUTCOMES___________")

              //bad way to do it maybe should imitate python's way
              const testCasesArr = JSON.parse(testCasesStr.trim())
              console.log("_________JSON PARSE TEST CASES STR___________")

              if (err) {
                console.error('EXECUTION ERROR______________________', err)
              }

              if (testCasesArr) {
                res.send({
                  testCasesArr,
                  rawOutput: '\n' + stderr + '\n' + revisedStdoutStr,
                  userId: req.session.passport.user,
                  questionsSolved: req.body.questionsSolved
                })
              }

            } catch (error) {
              cleanupCB()
              res.send({
                testCasesArr: [{ title: 'ERROR. All tests', outcome: 'failed' }],
                rawOutput: '\n' + stderr + '\n' + error,
                allPassed: false
              })
              console.error('CAUGHT ERROR____________________', error)
            }
          }
        )
      })
      .catch(error => {
        console.error(error)
      })
})

router.post('/python', (req, res, next) => {
  const createAlgorithmTestTempDirectory = () =>
    new Promise((resolve, reject) => {
      tmp.dir(
        {
          unsafeCleanup: true,
          prefix: 'test_',
          dir: path.join(__dirname, '..', 'algorithm_input_test')
        },
        (err, tmpPath, cleanupCB) => {
          if (err) {
            reject(err)
            return next(err)
          }
          resolve([tmpPath, cleanupCB])
        }
      )
    })

  const createAlgorithmInputFile = (algorithmInput, tempDirectory) =>
    new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(tempDirectory, 'program.py'),
        algorithmInput,
        err => {
          if (err) {
            reject(err)
            return next(err)
          }
          resolve()
        }
      )
    })

  const createAlgorithmTestFile = (algorithmTest, tempDirectory) =>
    new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(tempDirectory, 'algorithm-test.py'),
        algorithmTest,
        err => {
          if (err) {
            reject(err)
            return next(err)
          }
          resolve()
        }
      )
    })
    ; (async function (algorithmInput, algorithmTest) {
      const [
        algorithmTestTempDirectory,
        cleanupCB
      ] = await createAlgorithmTestTempDirectory()

      const algorithmTestFile = createAlgorithmTestFile(
        algorithmTest,
        algorithmTestTempDirectory
      )

      const algorithmInputFile = createAlgorithmInputFile(
        algorithmInput,
        algorithmTestTempDirectory
      )

      return [
        algorithmTestTempDirectory,
        cleanupCB,
        await algorithmInputFile,
        await algorithmTestFile
      ]

    })(req.body.algorithmContent, req.body.question.pythonTestFile).then(
      ([algorithmTestTempDirectory, cleanupCB]) => {
        exec(
          `npm run test-python-algorithm-input ./server/algorithm_input_test${algorithmTestTempDirectory.slice(
            algorithmTestTempDirectory.lastIndexOf('/')
          )}/algorithm-test.py`,
          { timeout: 5000 },
          (err, stdout, stderr) => {
            cleanupCB()
            const testCasesArr = getPythonTestCaseOutcomes(stderr)

            if (err) {
              console.error('EXEC______________\n', err, '\n_________EXEC')
            }

            console.log('STDERR______________\n', stderr, '\n_____________STDERR')
            console.log('TEST CASES ARR_____________\n', testCasesArr, '\n____________TEST CASES ARR')

            if (testCasesArr[0]) {
              res.send({
                testCasesArr,
                rawOutput: '\n' + stderr,
                userId: req.session.passport.user,
                questionsSolved: req.body.questionsSolved
              })
            } else {
              res.send({
                testCasesArr: [{ title: 'ERROR. All tests', outcome: 'failed' }],
                rawOutput: '\n' + stderr,
                userId: req.session.passport.user,
                questionsSolved: req.body.questionsSolved
              })
            }
            //res.send(stderr + '\n' + stdout) //customize the error manually here
          }
        )
      }
      )
})
