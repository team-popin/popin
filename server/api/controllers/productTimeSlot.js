const {
  models: { ProductTimeSlot, Product },}=require('../../db')
  const {Op} = require('sequelize');

const createProductTimeSlot = async (req, res, next) => {
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
};

const checkExistanceOrder =   async (req, res, next) => {
  try {
    res.send(await ProductTimeSlot.findAll({
      where: {
        orderId: req.params.orderId,
      }, include: Product
    }));
  }
  catch (err) {
    next(err);
  }
}

const getProductTimeSlots = async (req, res, next) => {
  try {
    res.send(await ProductTimeSlot.findAll({
      where: {
        dateTime: {
          [Op.and]: [
           { [Op.gte]: req.query.startDate},
           { [Op.lte]: req.query.endDate},
          ]
        },
        productId: req.query.productId,
        orderId: null,
      }, include: Product
    }));
  }
  catch (err) {
    next(err);
  }
};



const removeOrderAssociation=async (req, res, next) => {
  try {
    const productTimeSlot = await ProductTimeSlot.findByPk(req.params.id,  {include: {
      model: Product
    }});
    const updatedProductTimeSlot = await productTimeSlot.update({
      dateTime: req.body.dateTime || productTimeSlot.dateTime,
      productId: req.body.productId || productTimeSlot.productId,
      orderId: req.body.orderId
    });
    //orderId: req.body.orderId || productTimeSlot.orderId
    res.json(updatedProductTimeSlot);
  }
  catch (err) {
    next(err);
  }
}

const getProductTimeSlot = async (req, res, next) => {
  try {
    const productTimeSlot = await ProductTimeSlot.findByPk(req.params.id, {include: {
      model: Product
    }});
    res.json(productTimeSlot);
  }
  catch (err) {
    next(err);
  }
}

const deleteProductTimeSlot = async (req, res, next) => {
  try {
    const productTimeSlot = await ProductTimeSlot.findByPk(req.params.id);
    await productTimeSlot.destroy();
    res.sendStatus(204);
  }
  catch (err) {
    next(err);
  }
}

module.exports = {
  createProductTimeSlot,
  getProductTimeSlots,
  removeOrderAssociation,
  deleteProductTimeSlot,
  checkExistanceOrder,
  getProductTimeSlot,
};





