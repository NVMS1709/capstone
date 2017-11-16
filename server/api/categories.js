const router = require('express').Router()
const { Category, Question } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
    Category.findAll({include: [Question]})
        .then(category => res.json(category))
        .catch(next)
})
