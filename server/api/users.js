const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Password Incorrect')
      } else {
        user.update(req.body, { fields: ['name', 'email'] })
          .then(updatedUser => res.json(updatedUser))
      }
    })
    .catch(next)

})

router.put('/password/:userId', (req, res, next) => {
  console.log("IN BACKEND____________________-")
  User.findById(req.params.userId)
    .then(user => {
      if (!user.correctPassword(req.body.oldPassword)) {
        res.status(401).send('Password Incorrect')
      } else {
        user.update(req.body, { fields: ['password'] })
          .then(updatedUser => res.json(updatedUser))
      }
    })
    .catch(next)

})
