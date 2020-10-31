const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next({
      message: 'Вы должны войти в систему, чтобы посетить этот маршрут',
      statusCode: 401,
    });
  }

  const token = req.headers.authorization.replace('Bearer', '').trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded.id,
    });

    req.user = user;
    return next();
  } catch (err) {
    return next({
      message: 'Вы должны войти в систему, чтобы посетить этот маршрут',
      statusCode: 401,
    });
  }
};
