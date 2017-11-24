const router = require('express').Router()
const { Comment } = require('../db/models')

module.exports = router

router.post('/', (req, res, next) => {
  Comment.create()
    .then(comment => res.json(comment))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Comment.create(req.body, {
    where: {
      id: req.param.id
    }
  })
    .then(comment => res.json(comment))
    .catch(next)
})

router.get('/question', (req, res, next) => {
  Comment.findAll({
    where: {
      questionId: req.body.id
    }
  })
    .then(comments => res.json(comments))
    .catch(next)
})

router.get('/user', (req, res, next) => {
  Comment.findAll({
    where: {
      questionId: req.body.id
    }
  })
    .then(comments => res.json(comments))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Comment.findAll()
    .then(comments => res.json(comments))
    .catch(next)
})
