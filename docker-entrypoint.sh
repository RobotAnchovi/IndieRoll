#!/bin/sh
# docker-entrypoint.sh

echo "Waiting for PostgreSQL to start..."
# Implement waiting logic here, if necessary

# Assuming your migrations are correctly managed and included in your project repository
echo "Applying database migrations..."
flask db upgrade

echo "Seeding the database..."
flask seed all

# Execute the CMD from the Dockerfile, passing in all arguments
exec "$@"
