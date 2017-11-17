const router = require('express').Router()
const fs = require('fs')
const path = require('path')

module.exports = router

router.post('/', (req, res, next) => {
  console.log('----', req.body)
  fs.writeFile(path.join(__dirname, '..', 'test/algorithmInput.js'), req.body.algorithmContent, function (err) {
    if (err) throw err;
  });

  // appends module.exports = function name
  fs.appendFile(path.join(__dirname, '..', 'test/algorithmInput.js'), '\n\n module.exports = ' + req.body.question.functionName, function (err) {
    if (err) throw err;
    res.send(res.status)
  });

  fs.writeFile(path.join(__dirname, '..', 'test/testSpec.js'), req.body.question.testSpec, function (err) {
    if (err) throw err;
  });
})
