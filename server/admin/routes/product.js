const router = require("express").Router();
const {
  models: { Product },
} = require("../../db");
const { requireAdmin } = require('../../middleware');

// PUT /admin/product/:id
router.put("/:id", requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(await product.update(req.body));
  } catch (e) {
    next(e);
  }
});

// DELETE /admin/product/:id
router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
