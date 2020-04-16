require('dotenv').config();

const { setupSlonikMigrator } = require('@slonik/migrator');
const { createPool } = require('slonik');

// in an existing slonik project, this would usually be setup in another module
const slonik = createPool(
  `postgres://${process.env.PGADMINUSER}:${process.env.PGADMINPASSWORD}@${process.env.PGADMINHOST}:5432/${process.env.PGADMINDATABASE}`,
);

const migrator = setupSlonikMigrator({
  migrationsPath: __dirname + '/migrations',
  slonik,
  mainModule: module,
});

module.exports = { slonik, migrator };
