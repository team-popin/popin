const router = require('express').Router();
const { models: { ProductTimeSlot } } = require('../../db');



//get request that will send the productTimeSlot information
// for non-logged in user

// GET /productTimeSlot
router.get('/:id', async (req, res, next) => {
  try {
    const productTimeSlot = await ProductTimeSlot.findByPk(req.params.id);
    res.json(productTimeSlot);
  }
  catch (err) {
    next(err);
  }
});

//put request that will add the orderId to the productTimeSlot we are trying to add to our cart
router.put('/:id', async (req, res, next) => {
  try {
    const productTimeSlot = await ProductTimeSlot.findByPk(req.params.id);
    const updatedProductTimeSlot = await productTimeSlot.update({
      orderId: req.body.orderId
    });
    res.json(updatedProductTimeSlot);
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;

//THunk logic

//Get user id

//Find order associated with userId

//Send put request to the productTimeSlot with the orderId that we just got above


//If user has an existing order where isPurchased=false, then associate the ProductTimeSlot with that orderId

  //If the user does not have an existing order, create a new order, and then associate the ProductTimeSlot with that orderId

  // orderId
