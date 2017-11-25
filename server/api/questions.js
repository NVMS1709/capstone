const router = require('express').Router()
const { Question, Difficulty } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Question.findAll({ include: [Difficulty] })
    .then(questions => res.json(questions))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Question.create(req.body)
    .then(question => res.json(question))
    .catch(next)
})
