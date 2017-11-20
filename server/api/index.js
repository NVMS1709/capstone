const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/questions', require('./questions'))
router.use('/categories', require('./categories'))
router.use('/difficulties', require('./difficulties'))
router.use('/algorithm-execution', require('./algorithm-execution'))
router.use('/payment', require('./payment'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
