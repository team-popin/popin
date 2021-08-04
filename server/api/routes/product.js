const router = require('express').Router();
const {
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product');

// get all products
router.get('/', getAllProducts);

// get product by id
router.get('/product/:id', getProduct);

// create product
router.post('/product', createProduct);

// update product by id
router.put('/product/:id', updateProduct);

// delete product by id
router.delete('/product/:id', deleteProduct);

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
