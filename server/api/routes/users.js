const router = require('express').Router()
const { models: { User }} = require('../../db')
module.exports = router;
const {createUser, getUser, updateUser} = require('../controllers/user.js')


router.post("/", createUser);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.use((req, res, next) => {
  const err = new Error("API route not found!");
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
