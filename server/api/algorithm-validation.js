const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const {
  getTestCaseOutcomes,
  wrapTestfile,
  wrapAlgorithmInput,
  wrapPythonTestfile,
  getPythonTestCaseOutcomes
} = require('./algorithm-execution-util')
const tmp = require('tmp')

module.exports = router
router.post('/javascript', (req, res, next) => {
  req.body.submission.algorithmInput = wrapAlgorithmInput(
    req.body.submission.algorithmInput,
    req.body.submission.functionName
  )

  req.body.submission.testFile = wrapTestfile(
    req.body.submission.testFile,
    req.body.submission.functionName
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

    })(req.body.submission.algorithmInput, req.body.submission.testFile)
      .then(([algorithmTestTempDirectory, cleanupCB]) => {
        exec(
          `npm run test-javascript-algorithm-input ./server/algorithm_input_test${algorithmTestTempDirectory.slice(
            algorithmTestTempDirectory.lastIndexOf('/')
          )}/algorithm-test.js`,
          { timeout: 5000 },
          (err, stdout, stderr) => {
            try {
              cleanupCB()

              const { testCasesStr, revisedStdoutStr } = getTestCaseOutcomes(
                stdout
              )

              const testCasesArr = JSON.parse(testCasesStr.trim())

              if (err) {
                console.error('EXECUTION ERROR______________________', err)
              }

              let results

              if (testCasesArr) {
                console.log("AM I HERE IN TESTCASESARR")
                if (
                  !testCasesArr.find(testCase => testCase.outcome === 'failed')
                ) {
                  results = {
                    testCasesArr,
                    rawOutput: '\n' + stderr + '\n' + revisedStdoutStr,
                    allPassed: true
                  }

                } else {
                  results = {
                    testCasesArr,
                    rawOutput: '\n' + stderr + '\n' + revisedStdoutStr,
                    allPassed: false
                  }
                }
                res.send(results)
              }

            } catch (err1) {
              cleanupCB()
              res.send({
                testCasesArr: [{ title: 'Code validation', outcome: 'failed' }],
                rawOutput: err ? '\n' + stderr + '\n' + err : '\n' + stderr,
                allPassed: false
              })
              console.error('CAUGHT ERROR____________________', err1)
            }
          }
        )
      })
      .catch(error => {
        console.error(error)
      })
})


router.post('/python', (req, res, next) => {
  // req.body.submission.algorithmInput = wrapAlgorithmInput(
  //   req.body.submission.algorithmInput,
  //   req.body.submission.functionName
  // )

  req.body.submission.testFile = wrapPythonTestfile(
    req.body.submission.testFile
  )

  console.log('PYTHON SOLUTION__________\n', req.body.submission.algorithmInput, '\n_________PYTHON SOLUTIOn')


  console.log('PYTHON TEST FILE__________\n', req.body.submission.testFile, '\n_________PYTHON TEST FILE')

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

    })(req.body.submission.algorithmInput, req.body.submission.testFile)
      .then(([algorithmTestTempDirectory, cleanupCB]) => {
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
                testCasesArr: [{ title: 'ERROR. Code validation', outcome: 'failed' }],
                rawOutput: '\n' + stderr,
                userId: req.session.passport.user,
                questionsSolved: req.body.questionsSolved
              })
            }
          }
        )
      })
      .catch(error => {
        console.error(error)
      })
})
