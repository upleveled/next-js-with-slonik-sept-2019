const { createPool } = require('slonik');

const pool = createPool('postgres://');

module.exports = pool;
