const router = require('express').Router()

// get all products
router.get('/', async (req, res, next) => {
   try {
    const products = await Product.findAll();
    res.send(products);
  } catch (e) {
    next(e);
  }
})

// get product by id
router.get('/product/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: ProductTimeSlot.findAll({
          where: {
            productId: req.params.id
          }
        }),
        model: Category,
        model: User,
      }
    });
    res.send(product);
  } catch (e) {
    next(e);
  }
});

// create product
router.post('/product', async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (e) {
    next(e);
  }
});

// update product by id
router.put('/product/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (e) {
    next(e);
  }
});

// delete product by id
router.delete('/product/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (e) {
    next(e);
  }
});

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
