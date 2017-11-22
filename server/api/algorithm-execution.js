const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const getTestCaseOutcomes = require('./algorithm-execution-util')
const tmp = require('tmp')

// todo: sanitize the code input

module.exports = router
router.post('/javascript', (req, res, next) => {
  req.body.algorithmContent =
    req.body.algorithmContent +
    `\n module.exports = ${req.body.question.functionName}`

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

  ;(async function(algorithmInput, algorithmTest) {
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
  })(req.body.algorithmContent, req.body.question.javascriptTestFile)
    .then(([algorithmTestTempDirectory, cleanupCB]) => {
      exec(
        `npm run test-javascript-algorithm-input ./server/algorithm_input_test${algorithmTestTempDirectory.slice(
          algorithmTestTempDirectory.lastIndexOf('/')
        )}/algorithm-test.js`,
        { timeout: 5000 },
        (err, stdout, stderr) => {
          try {
            if (err) {
              cleanupCB()
              console.log('ERROR WITH EXEC______________________-', err)
              res.send({ rawOutput: err.message })
              return
              // next(err) CANNOT USE next(err)
            }
            cleanupCB()
            const { testCasesStr, revisedStdoutStr } = getTestCaseOutcomes(
              stdout
            )
            const testCasesArr = JSON.parse(testCasesStr.trim())
            let results
            if (
              req.session.passport &&
              req.session.passport.user &&
              !testCasesArr.find(testCase => testCase.outcome === 'failed')
            ) {
              results = {
                testCasesArr,
                rawOutput: '/n' + stderr + '\n' + revisedStdoutStr,
                userId: req.session.passport.user,
                questionsSolved: req.body.questionsSolved
              }
            } else {
              results = {
                testCasesArr,
                rawOutput: stderr + '\n' + revisedStdoutStr
              }
            }
            res.send(results)
          } catch (error) {
            cleanupCB()
            console.log('CAUGHT THE ERROR____________________')
            next(error)
          }
          //currently, res.send pretty much everything, including info on our backend system.
          //need to figure out a way to sanitize the output, so only re.send error and test results relevant to the user
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

  ;(async function(algorithmInput, algorithmTest) {
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
          if (err) {
            console.error(err)
            //next(err) CANNOT USE NEXT(ERR)
          }
          cleanupCB()
          //currently, res.send pretty much everything, including info on our backend system.
          //need to figure out a way to sanitize the output, so only re.send error and test results relevant to the user
          res.send(stderr + '\n' + stdout) //customize the error manually here
        }
      )
    }
  )
})
