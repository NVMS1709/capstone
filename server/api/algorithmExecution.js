const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process');

module.exports = router

router.post('/', (req, res, next) => {

  req.body.algorithmContent = req.body.algorithmContent + `\n module.exports = ${req.body.question.functionName}`

  const createAlgorithmInputFile = algorithmInput => (
    new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'algorithm_input_test/algorithm-input.js'), algorithmInput, (err) => {
        if (err) {
          reject(err)
          return next(err)
        }
        resolve()
      })
    })
  );

  const createAlgorithmTestFile = algorithmTest => (
    new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'algorithm_input_test/algorithm-test.js'), algorithmTest, (err) => {
        if (err) {
          reject(err)
          return next(err)
        }
        resolve()
      })
    })
  );

  (async function (algorithmInput, algorithmTest) {
    const algorithmTestFile = await createAlgorithmTestFile(algorithmTest)
    const algorithmInputFile = await createAlgorithmInputFile(algorithmInput);
    return [algorithmInputFile, algorithmTestFile];
  })(req.body.algorithmContent, req.body.question.testFile)
    .then(() => {
      exec('npm run test-algorithm-input', (err, stdout) => {
        if (err) next(err)
        res.send(stdout.split('\n').slice(3).join('\n'))
        //still has to clean the file!!
      })
    });
})
