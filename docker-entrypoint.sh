#!/bin/sh
# docker-entrypoint.sh

# Wait for the database to be available if necessary
# Example using PostgreSQL as an example
echo "Waiting for PostgreSQL to start..."
# Wait for a few seconds or implement a loop checking db connection

echo "Marking the current database version..."
flask db stamp 8028be1f3ce8

# Run database migrations
echo "Running database migrations..."
flask db upgrade

# Seed the database if needed
echo "Seeding the database..."
flask seed all


# Execute the CMD from the Dockerfile, passing in all arguments
exec "$@"
