const router = require('express').Router()
const { Question, Difficulty } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
    Question.findAll({ include: [Difficulty] })
        .then(questions => res.json(questions))
        .catch(next)
})

router.post('/', (req, res, next) => {
    if (req.body.id) {
        //Question.find()
    } else {
        Question.create(req.body)
            .then((questionCreated) => {
                res.json(questionCreated)
            })
            .catch(next)
    }
})
