const router = require('express').Router();
module.exports = router;

router.use('/products', require('./routes/products'));
router.use('/users', require('./routes/users'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
