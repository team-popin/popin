const router = require("express").Router();
const { models: { Order }} = require('../../db');
const { requireUser } = require('../../middleware');

// GET /api/order
router.get("/", requireUser, async (req, res, next) => {
  try {
    const userId = req.user.id;
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
});

// POST /api/order
// This route can't be protected
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

// GET /api/order/user
router.get("/user", requireUser, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id
      }
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/order/openOrder
router.get('/openOrder', requireUser, async (req, res, next) => {
  try {
    // query string: userId
    const order = await Order.findOne({where: {userId: req.user.id, isPurchased: false}});
    res.json(order);
  }
  catch (err) {
    next(err);
  }
});

// PUT /api/order/openOrder
router.put('/openOrder', requireUser, async (req, res, next) => {
  try {
    const order = await Order.findOne({where: {userId: req.user.id, isPurchased: false}});
    const updatedOrder = await order.update({
      isPurchased: req.body.isPurchased
    });
    res.json(updatedOrder);
  }
  catch (err) {
    next(err);
  }
});

// ROUTE NOT IN USE
// // GET /api/order/guest/:id
// router.get("/guest/:id", async (req, res, next) => {
//   try {
//     const order = await Order.findByPk(req.params.id, {where: {userId: null}})
//     res.json(order);
//   } catch (err) {
//     next(err);
//   }
// });

// PUT /api/order/guest/:id
router.put('/guest/:id', async (req, res, next) => {
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
