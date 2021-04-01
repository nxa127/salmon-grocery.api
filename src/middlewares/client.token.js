const User = require('../modules/user/user.model');
const jwt = require('../utils/jwt');

const CONSUME_DURATION = 1000 * 60 * 60 * 24;

const createNewToken = async user => {
  const timestamp = Date.now();
  const newToken = await jwt.sign(
    { userId: user._id, createdAt: timestamp },
    { expiresIn: CONSUME_DURATION / 1000 },
  );

  user.lastTokenCreatedAt = timestamp;
  await user.save();

  return newToken;
};

module.exports = async (req, res, next) => {
  const token = req.header('x-access-token');
  if (!token) {
    return next();
  }

  let data;
  try {
    data = await jwt.verify(token);

    if (!data || !data.userId) {
      return next();
    }

    req.userId = data.userId;

    if (!data.createdAt) {
      const user = await User.findById(data.userId);
      const newToken = await createNewToken(user);
      if (newToken) {
        res.set('Access-Control-Expose-Headers', 'x-new-access-token');
        res.set('x-new-access-token', newToken);
      }
      return next();
    }

    next();
  } catch (err) {
    data = await jwt.decode(token);
    if (!data || !data.userId) {
      return next();
    }

    const user = await User.findById(data.userId);
    const newToken = createNewToken(user);

    if (newToken) {
      res.set('Access-Control-Expose-Headers', 'x-new-access-token');
      res.set('x-new-access-token', newToken);
    }
    req.userId = data.userId;
    return next();
  }
};
