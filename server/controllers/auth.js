const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { asyncHandler } = require('../middleware');

exports.signup = asyncHandler(async (req, res) => {
  const user = await User.create({ ...req.body, total: 1073741824, used: 0 });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({ success: true, data: token });
});

exports.login = async (req, res, next) => {
  const { login, password } = req.body;

  const user = await User.findOne({ login });

  if (!user) {
    return next({
      message: 'The login is not yet registered',
      statusCode: 400,
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return next({ message: 'The password does not match', statusCode: 400 });
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return res.status(200).json({ success: true, data: token });
};
