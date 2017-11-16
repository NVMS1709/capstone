const router = require('express').Router()
const { Question } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Question.findAll()
    .then(questions => res.json(questions))
    .catch(next)
})
