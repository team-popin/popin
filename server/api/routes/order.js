const router = require("express").Router();
const { models: { Order }} = require('../../db');
const {getAllOrder, createOrder, updateOrder, updateOrderById, getOpenOrderByUser, getOrderById, getOrderOfUser} = require('../controllers/order')

// query string handler
router.get("/", getAllOrder);

//get orders for an individual user
router.get("/user/:id", getOrderOfUser);

//Get open order 'api/order/open_order?userId=3'
router.get('/openOrder', getOpenOrderByUser);

//get order by id
router.get("/:id", getOrderById);

//put order
router.put('/openOrder', updateOrder);

//put order by id
router.put('/:id', updateOrderById);

//post order
router.post('/', createOrder);

module.exports = router;
