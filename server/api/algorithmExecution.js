const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const tmp = require('tmp');

module.exports = router
const tempDirNameLength = 22;
router.post('/', (req, res, next) => {

  req.body.algorithmContent = req.body.algorithmContent + `\n module.exports = ${req.body.question.functionName}`

  const createAlgorithmTestTempDirectory = () => (
    new Promise((resolve, reject) => {
      tmp.dir({ unsafeCleanup: true, prefix: 'test_', dir: path.join(__dirname, '..', 'algorithm_input_test') }, (err, tmpPath, cleanupCB) => {
        if (err) {
          reject(err)
          return next(err)
        }
        resolve([tmpPath, cleanupCB])
      })
    })
  );

  const createAlgorithmInputFile = (algorithmInput, tempDirectory) => (
    new Promise((resolve, reject) => {
      fs.writeFile(path.join(tempDirectory, 'algorithm-input.js'), algorithmInput, (err) => {
        if (err) {
          reject(err)
          return next(err)
        }
        resolve()
      })
    })
  );

  const createAlgorithmTestFile = (algorithmTest, tempDirectory) => (
    new Promise((resolve, reject) => {
      fs.writeFile(path.join(tempDirectory, 'algorithm-test.js'), algorithmTest, (err) => {
        if (err) {
          reject(err)
          return next(err)
        }
        resolve()
      })
    })
  );

  (async function (algorithmInput, algorithmTest) {
    const [algorithmTestTempDirectory, cleanupCB] = await createAlgorithmTestTempDirectory()
    const algorithmTestFile = createAlgorithmTestFile(algorithmTest, algorithmTestTempDirectory)
    const algorithmInputFile = createAlgorithmInputFile(algorithmInput, algorithmTestTempDirectory);
    return [algorithmTestTempDirectory, cleanupCB, await algorithmInputFile, await algorithmTestFile];
  })(req.body.algorithmContent, req.body.question.testFile)
    .then(([algorithmTestTempDirectory, cleanupCB]) => {
      exec(`npm run test-algorithm-input ./server/algorithm_input_test/${algorithmTestTempDirectory.slice(-tempDirNameLength)}/algorithm-test.js`, (err, stdout, stderr) => {
        if (err) {
          next(err)
        }
        //currently, res.send pretty much everything, including info on our backend system.
        //need to figure out a way to sanitize the output, so only re.send error and test results relevant to the user
        res.send(stderr + '\n' + stdout.split('\n').slice(3).join('\n'))
        cleanupCB();
      })
    });
})
