const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const {
  getTestCaseOutcomes,
  wrapTestfile,
  wrapAlgorithmInput
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

              const { testCasesStr, revisedStdoutStr } = getTestCaseOutcomes(
                stdout
              )

              const testCasesArr = JSON.parse(testCasesStr.trim())

              if (err) {
                cleanupCB()
                console.error('EXECUTION ERROR______________________', err)
              }

              cleanupCB()

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
                testCasesArr: [{ title: 'Code execution failed', outcome: 'failed' }],
                rawOutput: '\n' + err1,
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
