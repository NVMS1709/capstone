const router = require('express').Router()
const fs = require('fs')

module.exports = router

router.post('/', (req, res, next) => {
  fs.writeFile('/Users/daddyyun/Fullstack/capstone/server/test/algorithmInput.js', req.body.algorithmContent, function (err) {
    if (err) throw err;
  });

  // hardcoded module.exports
  fs.appendFile('/Users/daddyyun/Fullstack/capstone/server/test/algorithmInput.js', '\n\n module.exports = BST', function (err) {
    if (err) throw err;
    res.send(res.status)
  })
})
