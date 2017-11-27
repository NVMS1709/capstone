const router = require('express').Router()
const { Question, Difficulty, Category } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Question.findAll({ include: [Difficulty, Category] })
    .then(questions => res.json(questions))
    .catch(next)
})

router.post('/', (req, res, next) => {

  if (req.body.existingId) {

    Question.findById(req.body.existingId)
      .then(questionFound => {

        Promise.all([

          Difficulty.findOne({
            where: {
              name: req.body.difficulty
            }
          })
            .then(difficulty => {
              return difficulty.id
            })
            .catch(next),

          Category.findOne({
            where: {
              name: req.body.category
            }
          })
            .then(category => {
              return category.id
            })
            .catch(next),

        ])
          .then(([difficultyId, categoryId]) => {
            req.body.difficultyId = difficultyId
            req.body.categoryId = categoryId

            questionFound.update(req.body)
              .then((questionUpdated) => {
                res.json(questionUpdated)
              })
              .catch(next)
          })
          .catch(next)
      })

  } else {

    Promise.all([

      Difficulty.findOne({
        where: {
          name: req.body.difficulty
        }
      })
        .then(difficulty => {
          return difficulty.id
        })
        .catch(next),

      Category.findOne({
        where: {
          name: req.body.category
        }
      })
        .then(category => {
          return category.id
        })
        .catch(next),

    ])
      .then(([difficultyId, categoryId]) => {

        req.body.difficultyId = difficultyId
        req.body.categoryId = categoryId

        Question.create(req.body)
          .then((questionCreated) => {
            res.json(questionCreated)
          })
          .catch(next)
      })

  }
})

router.delete('/:questionId', (req, res, next) => {
  Question.findById(req.params.questionId)
    .then(questionFound => {
      return questionFound.destroy()
    })
    .then(() => {
      res.json('DELETE SUCCESS')
    })
    .catch(next)
})

