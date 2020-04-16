const connection = require('../migrationConnection');

module.exports.up = async ({ sql }) => {
  return connection.query(sql`CREATE TABLE user_permission(
    id SERIAL,
    user_id INTEGER,
    permission_id INTEGER
  )`);
};

module.exports.down = async ({ sql }) => {
  return connection.query(sql`DROP TABLE user_permission`);
};
