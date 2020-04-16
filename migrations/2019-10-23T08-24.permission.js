const connection = require('../migrationConnection');

module.exports.up = async ({ sql }) => {
  return connection.query(sql`CREATE TABLE permission(
    id SERIAL,
    is_admin BOOLEAN
  )`);
};

module.exports.down = async ({ sql }) => {
  return connection.query(sql`DROP TABLE permission`);
};
