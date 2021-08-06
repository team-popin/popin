const router = require('express').Router();
const { models: { ProductTimeSlot } } = require('../../db');
const Product = require('../../db/models/Product');

// POST /api/productTimeSlot/
router.post('/', async (req, res, next) => {
  try {
    const newTimeSlot = await ProductTimeSlot.create({
      dateTime: req.body.dateTime,
    });
    newTimeSlot.setProduct(req.body.productId);
      // We should make sure that a user can only add a new timeslot to their own products, referencing their own productId's
    res.json(newTimeSlot);
  }
  catch (err) {
    next(err);
  }
});

// GET /api/productTimeSlot/:id
router.get('/:id', async (req, res, next) => {
  try {
    const productTimeSlot = await ProductTimeSlot.findByPk(req.params.id, {include: {
      model: Product
    }});
    res.json(productTimeSlot);
  }
  catch (err) {
    next(err);
  }
});

// PUT /api/productTimeSlot/:id
router.put('/:id', async (req, res, next) => {
  try {
    const productTimeSlot = await ProductTimeSlot.findByPk(req.params.id);
    const updatedProductTimeSlot = await productTimeSlot.update({
      dateTime: req.body.dateTime || productTimeSlot.dateTime,
      productId: req.body.productId || productTimeSlot.productId,
      orderId: req.body.orderId || productTimeSlot.orderId
    });
    res.json(updatedProductTimeSlot);
  }
  catch (err) {
    next(err);
  }
});

// DELETE /api/productTimeSlot/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const productTimeSlot = await ProductTimeSlot.findByPk(req.params.id);
    await productTimeSlot.destroy();
    res.sendStatus(204);
  }
  catch (err) {
    next(err);
  }
});
//^^NOTE: Deleting leaves the row in the db null

module.exports = router;
