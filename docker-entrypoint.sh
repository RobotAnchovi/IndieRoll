#!/bin/sh
# docker-entrypoint.sh

# Wait for the database to be available if necessary
# Example using PostgreSQL as an example
echo "Waiting for PostgreSQL to start..."
# Wait for a few seconds or implement a loop checking db connection

# Run database migrations
echo "Generating Database Tables..."
flask db upgrade

echo "Migrating Database..."
flask db migrate

# Seed the database if needed
echo "Seeding the database..."
flask seed all


# Execute the CMD from the Dockerfile, passing in all arguments
exec "$@"
