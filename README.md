# Next.js Slonik API Routes example

- [Next.js](https://nextjs.org/)
- TypeScript
- [Next.js 9+ API Routes](https://nextjs.org/blog/next-9#api-routes)
- [Slonik](https://github.com/gajus/slonik) (with [PostgreSQL](https://www.postgresql.org/))
- [@slonik/migrator](https://www.npmjs.com/package/@slonik/migrator) for database migrations

## Setup

You'll need PostgreSQL for this.

Copy the `.env.example` file to a new file called `.env` and fill in the values described in the following table.

This user and database will be created by the migrations, and will be used by the Next.js application. The user will be given limited access only to the database specified:

| Variable     | Description                                        |
| ------------ | -------------------------------------------------- |
| `PGHOST`     | Name of the host to connect to - often `localhost` |
| `PGUSER`     | Database user                                      |
| `PGPASSWORD` | Password for the database user                     |
| `PGDATABASE` | Database that the user has access to               |

In order to create this user and database, we will also need the `ADMIN` variables, which are PostgreSQL admin connection details.

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
