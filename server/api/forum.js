const router = require('express').Router()
const { Forum, ForumComment, User } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  Forum.findAll({
    include: [
      { model: User, required: true },
      { model: ForumComment, required: false }
    ]
  })
    .then(comments => res.json(comments))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Forum.create(req.body)
    .then(comments => res.json(comments))
    .catch(next)
})

router.post('/comments', (req, res, next) => {
  Forum.findOne({ where: { title: req.body.title } })
    .then(comments =>
      ForumComment.findAll({
        where: { forumId: comments.id },
        include: [{ model: User, required: true }]
      })
    )
    .then(comments => res.json(comments))
    .catch(next)
})

router.post('/comment/new', (req, res, next) => {
  ForumComment.create(req.body)
    .then(comments => res.json(comments))
    .catch(next)
})

router.delete('/comments/:id', (req, res, next) => {
  ForumComment.destroy({ where: { id: req.params.id } })
    .then(comments => res.json(comments))
    .catch(next)
})

// router.post('/', (req, res, next) => {
//   Comment.create(req.body)
//     .then(comment => res.json(comment))
//     .catch(next)
// })

// router.put('/:id', (req, res, next) => {
//   Comment.update(req.body, {
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(comment => res.json(comment))
//     .catch(next)
// })
