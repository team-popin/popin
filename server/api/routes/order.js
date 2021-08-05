const router = require("express").Router();
const { models: { Order }} = require('../../db');

//get orders for an individual user
router.get("/user/:id", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.id
      }
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

//get order by id
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    res.json(order);
  } catch (err) {
    next(err);
  }
});


//put order
router.put('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    const updatedOrder = await order.update({
      isPurchased: req.body.isPurchased
    });
    res.json(updatedOrder);
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
