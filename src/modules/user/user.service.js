const User = require('./user.model');

const jwt = require('../../utils/jwt');
const hasher = require('../utils/hasher');

const createUser = async ({ username, password, email }) => {
  try {
    const user = await User.create({ username, password, email });
    return user;
  } catch (e) {
    return e;
  }
};

module.exports = () => ({
  register: async (username, password, email) => {
    if (password.length < 6) {
      throw new Error('Password must be longer than 6 characters');
    }

    try {
      const hashedPassword = await hasher.hash(password);
      await createUser({
        username,
        password: hashedPassword,
        email
      });

      return true;
    } catch (e) {
      console.log('Register failed, reason:', e);
      return false;
    }
  },
  login: async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await hasher.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Password is incorrect');
    }

    return jwt.sign({ userId: user.id });
  }
});
