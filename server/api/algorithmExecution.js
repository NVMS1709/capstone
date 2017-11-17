const router = require('express').Router()
const fs = require('fs')
const path = require('path')

module.exports = router

router.post('/', (req, res, next) => {
  fs.writeFile(path.join(__dirname, '..', 'test/algorithmInput.js'), req.body.algorithmContent, function (err) {
    if (err) throw err;
  });

  // appends module.exports = function name
  fs.appendFile(path.join(__dirname, '..', 'test/algorithmInput.js'), '\n\n' + req.body.moduleExports, function (err) {
    if (err) throw err;
    res.send(res.status)
  })
})
