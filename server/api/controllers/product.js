const {
  models: { Product, ProductTimeSlot, Category, User },
} = require('../../db');

const createProduct = async (req, res, next) => {
  try {
    res.send(await Product.create(req.body));
  } catch (e) {
    next(e);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: ProductTimeSlot.findAll({
          where: {
            productId: req.params.id,
          },
        }),
        model: Category,
        model: User,
      },
    });
    res.send(product);
  } catch (e) {
    next(e);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  } catch (e) {
    next(e);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (e) {
    next(e);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (e) {
    next(e);
  }
};

 const getCategory = async (req,res,next)=>{
   try{
    res.send(await Category.findAll())
   }
   catch(e){next(e)}
 };

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getCategory,
  getAllProducts,
};
