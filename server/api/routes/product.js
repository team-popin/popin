const router = require("express").Router();
const {
  models: { Product, ProductTimeSlot, Category, User },
} = require("../../db");
const { requireUser } = require('../../middleware');


// GET /api/product
router.get("/", async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (e) {
    next(e);
  }
});

// GET /api/product/category
router.get("/category", async (req, res, next) => {
  try {
    res.send(await Category.findAll());
  } catch (e) {
    next(e);
  }
});

// GET /api/product/:id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: ProductTimeSlot.findAll({
          where: {
            productId: req.params.id,
          },
        }),
        model: Category,
        model: User,
      },
    });
    res.send(product);
  } catch (e) {
    next(e);
  }
});

// // POST /api/product
// router.post('/', async (req, res, next) => {
//   try {
//     res.send(await Product.create(req.body));
//   } catch (e) {
//     next(e);
//   }
// });

// PUT /api/product/:id
// router.put("/:id", requireUser, async (req, res, next) => {
//   try {
//     const product = await Product.findByPk(req.params.id, {where: {userId: req.user.id}});
//     res.send(await product.update(req.body));
//   } catch (e) {
//     next(e);
//   }
// });

// DELETE /api/product/:id
// router.delete("/:id", requireUser, async (req, res, next) => {
//   try {
//     const product = await Product.findByPk(req.params.id, {where: {userId: req.user.id});
//     await product.destroy();
//     res.send(product);
//   } catch (e) {
//     next(e);
//   }
// });

module.exports = router;
