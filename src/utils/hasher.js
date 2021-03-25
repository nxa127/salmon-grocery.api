const Promise = require('bluebird');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

module.exports = {
  hash: str =>
    new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        if (err) {
          return reject(err);
        }
        bcrypt.hash(str, salt, (err, hash) => {
          if (err) {
            return reject(err);
          }
          return resolve(hash);
        });
      });
    }),
  compare: (str, src) =>
    new Promise((resolve, reject) => {
      bcrypt
        .compare(str, src)
        .then(res => resolve(res))
        .catch(e => reject(e));
    })
};
