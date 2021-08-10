const { models: { User } } = require('./db');

const throwErr = (statusCode, message) => {
  const err = new Error(message);
  err.status = statusCode;
  console.log(err.status);
  return err;
}

const requireUser = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        const message = "Please sign in to view this page."
        next(throwErr(403, message));
      }
      const user = await User.findByToken(token);
      req.user = user;
      next();
    } catch(error) {
      next(error);
    }
  };


const requireAdmin = async (req, res, next ) => {
  try {
    console.log('AUTH HEADERS', req.headers.authorization);
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    if (!user.isAdmin) {
      const message = "You do not have the correct permissions to access/modify this."
      next(throwErr(403, message));
    }
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = {
  requireUser,
  requireAdmin
}
