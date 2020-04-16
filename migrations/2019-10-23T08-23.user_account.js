const connection = require('../migrationConnection');

module.exports.up = async ({ sql }) => {
  return connection.query(sql`CREATE TABLE user_account(
    id SERIAL,
    username TEXT,
    password_hash TEXT
  )`);
};

module.exports.down = async ({ sql }) => {
  return connection.query(sql`DROP TABLE user_account`);
};
