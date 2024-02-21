#!/bin/sh
# docker-entrypoint.sh
DB_URL="postgres://app_academy_projects_7wv5_user:c2V7Ujo7yPB9kmfhQI8sjdNlaOUU39KJ@dpg-cn80s4q1hbls73d85k5g-a.ohio-postgres.render.com/app_academy_projects_7wv5"
# Wait for the database to be available if necessary
# Example using PostgreSQL as an example
echo "Waiting for PostgreSQL to start..."
# Wait for a few seconds or implement a loop checking db connection

echo "Generating migrations"
flask db migrate

echo "Marking the current database version..."
flask db stamp head

# Run database migrations
echo "Running database migrations..."
flask db upgrade

# Seed the database if needed
echo "Seeding the database..."
flask seed all


# Execute the CMD from the Dockerfile, passing in all arguments
exec "$@"
