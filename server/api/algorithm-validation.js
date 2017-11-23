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
  })(req.body.submission.algorithmInput, req.body.submission.testFile)
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
              console.error('ERROR WITH EXEC______________________-', err)
              res.send({
                testCasesArr: [
                  {
                    title:
                      'Error with code execution. See raw output for further information',
                    outcome: ''
                  }
                ],
                rawOutput: err.message
              })
              return
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
              testCasesArr &&
              !testCasesArr.find(testCase => testCase.outcome === 'failed')
            ) {
              results = {
                testCasesArr,
                rawOutput: '/n' + stderr + '\n' + revisedStdoutStr,
                userId: req.session.passport.user,
                questionsSolved: req.body.questionsSolved
              }
            } else {
              results = { rawOutput: stderr + '\n' + revisedStdoutStr }
            }

            res.send(results)
          } catch (error) {
            cleanupCB()
            console.error('CAUGHT THE ERROR____________________')
            next(error)
          }
        }
      )
    })
    .catch(error => {
      console.error(error)
    })
})
