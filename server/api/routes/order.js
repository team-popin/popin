const router = require("express").Router();
const { models: { Order }} = require('../../db');

// query string handler
router.get("/", async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const isPurchased = req.query.isPurchased;

    const orders = await Order.findAll({
      where: {
        userId,
        isPurchased
      }
    });
    res.json(orders);
  }
  catch (err) {
    next(err);
  }
})


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

//Get open order 'api/order/open_order?userId=3'
router.get('/openOrder', async (req, res, next) => {
  try {
    const order = await Order.findOne({where: {userId: req.query.userId, isPurchased: false}});
    res.json(order);

    console.log("BackEND", order)
  }
  catch (err) {
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
router.put('/openOrder', async (req, res, next) => {
  try {
    const order = await Order.findOne({where: {userId: req.query.userId, isPurchased: false}});
    const updatedOrder = await order.update({
      isPurchased: req.body.isPurchased
    });
    res.json(updatedOrder);
  }
  catch (err) {
    next(err);
  }
});

//put order by id
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



//post order
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create({isPurchased: req.body.isPurchased});
    newOrder.setUser(req.body.userId);
    res.json(newOrder);
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
