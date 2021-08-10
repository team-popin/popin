const router = require('express').Router();
const {
  models: { User, Order },
} = require('../../db');
const { requireUser } = require('../../middleware');


// // GET /api/user/
// router.get('/', requireUser, async (req, res, next) => {
//   try {
//     res.send(
//       await User.findByPk(req.user.id, {
//         include: Order,
//       })
//     );
//   } catch (e) {
//     next(e);
//   }
// });

// // PUT /api/user
// router.put('/', requireUser, async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.user.id);
//     res.send(await user.update(req.body));
//   } catch (e) {
//     next(e);
//   }
// });

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;














// _
// ,.-" "-.,
// /   ===   \
// /  =======  \
// __|  (o)   (0)  |__
// / _|    .---.    |_ \
// | /.----/ O O \----.\ |
// \/     |     |     \/
// |                   |
// |                   |
// |                   |
// _\   -.,_____,.-   /_
// ,.-"  "-.,_________,.-"  "-.,
// /          |       |          \
// |           l.     .l           |
// |            |     |            |
// l.           |     |           .l
// |           l.   .l           | \,
// l.           |   |           .l   \,
// |           |   |           |      \,
// l.          |   |          .l        |
// |          |   |          |         |
// |          |---|          |         |
// |          |   |          |         |
// /"-.,__,.-"\   /"-.,__,.-"\"-.,_,.-"\
// |            \ /            |         |
// |             |             |         |
// \__|__|__|__/ \__|__|__|__/ \_|__|__/
