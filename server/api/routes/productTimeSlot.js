const router = require('express').Router();
const { models: { ProductTimeSlot } } = require('../../db');
const {Op} = require('sequelize');
const Product = require('../../db/models/Product');
const {createProductTimeSlot,removeOrderAssociation, getProductTimeSlots, getProductTimeSlot, deleteProductTimeSlot, checkExistanceOrder}= require("../controllers/productTimeSlot")

// POST /api/productTimeSlot/
router.post('/', createProductTimeSlot);

//GET /api/productTimeSlot
router.get('/', getProductTimeSlots);

//GET /api/productTimeSlot/order/:orderId
router.get('/order/:orderId', checkExistanceOrder);

// GET /api/productTimeSlot/:id
router.get('/:id', getProductTimeSlot);


// PUT /api/productTimeSlot/:id
router.put('/:id', removeOrderAssociation);

// DELETE /api/productTimeSlot/:id
router.delete('/:id', deleteProductTimeSlot);
//^^NOTE: Deleting leaves the row in the db null

module.exports = router;
