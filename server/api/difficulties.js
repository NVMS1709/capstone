const router = require('express').Router()
const { Difficulty, Question } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
    Difficulty.findAll({include: [Question]})
        .then(difficulty => res.json(difficulty))
        .catch(next)
})
