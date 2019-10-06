const { setupSlonikMigrator } = require('@slonik/migrator');
const { createPool } = require('slonik');
require = require('esm')(module);
const config = require('./config.js').default;

// in an existing slonik project, this would usually be setup in another module
const slonik = createPool(config.POSTGRES_CONNECTION_STRING);

const migrator = setupSlonikMigrator({
  migrationsPath: __dirname + '/migrations',
  slonik,
  mainModule: module,
});

module.exports = { slonik, migrator };
