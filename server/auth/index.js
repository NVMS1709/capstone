const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        res.status(401).send('Username / Password Incorrect')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Username / Password Incorrect')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  if (req.body.email.indexOf('@') === -1) {
    res.status(401).send('Enter Valid Email')
  } else {
    User.create(req.body)
      .then(user => {
        req.login(user, err => (err ? next(err) : res.json(user)))
      })
      .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
          res.status(401).send('User already exists')
        } else {
          next(err)
        }
      })
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
router.use('/github', require('./github'))
