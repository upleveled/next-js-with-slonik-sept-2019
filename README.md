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

Install PostgreSQL with [Chocolatey](https://chocolatey.org/):

```sh
choco install postgresql --params '/Password:postgres' -y
```

This will install PostgreSQL and create a default user of `postgres` with a password of `postgres`.

Now let's set an environment variable to tell PostgreSQL where to put the data:

```sh
echo "export PGDATA=${$(dirname $(which postgres))/bin/data}" >> %userprofile%/.bash_profile
source %userprofile%/.bash_profile
```

Now everything should be ready to go! Try running `postgres` on the command line.

If it doesn't work and it complains about not being able to find `postgres`, it may be missing the proper `PATH` variable.

This may help:

```sh
echo "export PATH=$PATH:$(dirname $(which postgres))" >> %userprofile%/.bash_profile
source %userprofile%/.bash_profile
```

#### macOS

Install PostgreSQL with [Homebrew](https://brew.sh/):

```sh
brew install postgresql
```

This will install PostgreSQL and create just a single user with your username and all role permissions. There will be no `postgres` user set up.

Now let's set an environment variable to tell PostgreSQL where to put the data:

```sh
echo "export PGDATA=/usr/local/var/postgres" >> ~/.bash_profile
source ~/.bash_profile
```

Now everything should be ready to go! Try running `postgres` on the command line.

### Database and Role Setup

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
