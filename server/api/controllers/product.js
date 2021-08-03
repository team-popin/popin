const { models: { Product }} = require('../../db')

const createProduct = async (req, res, next) => {
  try {
    res.send(await Product.create(req.body));
  } catch (e) {
    next(e);
  }
}

const getProduct = async (req, res, next) => {
  try {
    res.send(await Product.findByPk(req.params.id, {
      include: Order,
    }))
  } catch (e) {
      next(e);
    }
  }

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (e) {
    next(e);
  }
}

const deleteProduct = async (req, res, next) => {
try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (e) {
    next(e);
  }
}

module.exports= {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
}
