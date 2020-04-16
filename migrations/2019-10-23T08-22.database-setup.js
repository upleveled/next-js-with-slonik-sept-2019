require('dotenv').config();

const { raw } = require('slonik-sql-tag-raw');

function getRawEnvVar(name) {
  return raw(process.env[name]);
}

module.exports.up = async ({ slonik: adminConnection, sql }) => {
  try {
    // Try connecting to non-admin database with non-admin role (in case it already exists)
    const connection = require('../migrationConnection');
    await connection.query(sql`SELECT 1`);
  } catch (err) {
    await adminConnection.query(
      sql`CREATE USER ${getRawEnvVar(
        'PGUSER',
      )} WITH ENCRYPTED PASSWORD '${getRawEnvVar('PGPASSWORD')}'`,
    );
    await adminConnection.query(
      sql`CREATE DATABASE ${getRawEnvVar('PGDATABASE')}`,
    );
    await adminConnection.query(
      sql`GRANT ALL PRIVILEGES ON DATABASE ${getRawEnvVar(
        'PGDATABASE',
      )} TO ${getRawEnvVar('PGUSER')}`,
    );
  }
};

module.exports.down = async ({ slonik: adminConnection, sql }) => {
  try {
    await adminConnection.query(
      sql`REVOKE ALL PRIVILEGES ON DATABASE ${getRawEnvVar(
        'PGDATABASE',
      )} FROM ${getRawEnvVar('PGUSER')}`,
    );
    await adminConnection.query(
      sql`DROP DATABASE ${getRawEnvVar('PGDATABASE')}`,
    );
    await adminConnection.query(sql`DROP USER ${getRawEnvVar('PGUSER')}`);
  } catch (err) {
    console.error('Error removing permissions, database and user:', err);
  }
};
