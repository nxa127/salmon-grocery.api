const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  sign: (data, options) =>
    new Promise((resolve, reject) =>
      jwt.sign(data, SECRET_KEY, options, (err, token) => {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      })
    ),
  verify: token =>
    new Promise((resolve, reject) =>
      jwt.verify(token, SECRET_KEY, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      })
    ),
  decode: token => jwt.decode(token)
};
