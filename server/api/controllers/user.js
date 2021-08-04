const {
  models: { User, Order },
} = require('../../db/models');

const createUser = async (req, res, next) => {
  try {
    res.send(await User.create(req.body));
  } catch (e) {
    next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    res.send(
      await User.findByPk(req.params.id, {
        include: Order,
      })
    );
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
};
