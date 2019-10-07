# Next.js Slonik API Routes example

- [Next.js](https://nextjs.org/)
- [Next.js 9+ API Routes](https://nextjs.org/blog/next-9#api-routes)
- [Slonik](https://github.com/gajus/slonik) (with [PostgreSQL](https://www.postgresql.org/))
- [@slonik/migrator](https://www.npmjs.com/package/@slonik/migrator) for database migrations

## Setup

You'll need PostgreSQL for this.

### PostgreSQL Installation instructions

#### Windows

**Pre-requisite:** Git bash or other similar Bash shell.

Follow the instructions from [the PostgreSQL step in UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/windows.md#user-content-postgresql).

Run the following commands to set up the database and the user (now the password will be `postgres`):

```sh
psql -U postgres -c "CREATE DATABASE slonik;"
psql -U postgres -c "CREATE USER slonik WITH ENCRYPTED PASSWORD 'slonik';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE slonik TO slonik;"
```

#### macOS

Follow the instructions from [the PostgreSQL step in UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/macos.md#user-content-postgresql).

Run the following commands to set up the database and the user:

```sh
psql postgres -c "CREATE DATABASE slonik;"
psql postgres -c "CREATE USER slonik WITH ENCRYPTED PASSWORD 'slonik';"
psql postgres -c "GRANT ALL PRIVILEGES ON DATABASE slonik TO slonik;"
```

### Run Migrations to Set up Tables

The migrations that have been written using [@slonik/migrator](https://www.npmjs.com/package/@slonik/migrator) can be run using the following command:

```sh
node migrate up
```

To roll back the changes in the migrations, run the following command:

```sh
node migrate down
```

### Create New Migrations

The [@slonik/migrator](https://www.npmjs.com/package/@slonik/migrator) tool can be used to create new migrations as well.

For example, to create a new migration called `todo` (for example, to create a database table called `todo`):

```sh
node migrate create todo
```
