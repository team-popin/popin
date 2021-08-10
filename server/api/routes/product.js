const router = require('express').Router();
const {
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategory,
} = require('../controllers/product');

// get all products
router.get('/', getAllProducts);

router.get('/category', getCategory)

// get product by id
router.get('/:id', getProduct);

// create product
router.post('/', createProduct);

// update product by id
router.put('/:id', updateProduct);

// delete product by id
router.delete('/:id', deleteProduct);


router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
