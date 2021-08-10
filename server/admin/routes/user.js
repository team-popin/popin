const { requireAdmin } = require('../../middleware');
const {
  models: { User, Order },
} = require('../../db');
const router = require('express').Router();

// GET /api/user/:id
router.get('/:id', requireAdmin, async (req, res, next) => {
  try {
    res.send(
      await User.findByPk(req.params.id, {
        include: Order,
      })
    );
  } catch (e) {
    next(e);
  }
});

// PUT /api/user:id
router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
