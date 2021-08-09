const { models: { Order }} = require('../../db');

const getAllOrder =async (req, res, next) => {
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
}

const getOpenOrderByUser = async (req, res, next) => {
  try {
    const order = await Order.findOne({where: {userId: req.query.userId, isPurchased: false}});
    res.json(order);
  }
  catch (err) {
    next(err);
  }
}

const getOrderOfUser =async (req, res, next) => {
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
}

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id)
    res.json(order);
  } catch (err) {
    next(err);
  }
}

const updateOrder = async (req, res, next) => {
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
}

const createOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create({isPurchased: req.body.isPurchased});
    newOrder.setUser(req.body.userId);
    res.json(newOrder);
  }
  catch (err) {
    next(err);
  }
}

const updateOrderById = async (req, res, next) => {
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
}

module.exports = {
  getAllOrder,
  getOpenOrderByUser,
  getOrderOfUser,
  getOrderById,
  updateOrder,
  createOrder,
  updateOrderById
}
