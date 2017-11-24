const router = require('express').Router()
const { Comment, User } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  Comment.findAll({
    include: [{ model: User, required: true }]
  })
    .then(comments => res.json(comments))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Comment.create(req.body)
    .then(comment => res.json(comment))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id } })
    .then(comment => res.json(comment))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Comment.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(comment => res.json(comment))
    .catch(next)
})
