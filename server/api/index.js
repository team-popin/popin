const router = require('express').Router()
module.exports = router

router.use('/product', require('./routes/product'));
router.use('/user', require('./routes/user'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
