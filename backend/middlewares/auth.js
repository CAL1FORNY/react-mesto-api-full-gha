const jwt = require('jsonwebtoken');
const Unauthorized = require('../utils/response-errors/Unauthorized');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходимо выполнить авторизацию'));
  }

  let payload;
  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (_) {
    return next(new Unauthorized('Необходимо выполнить авторизацию'));
  }

  req.user = payload;
  next();
};
