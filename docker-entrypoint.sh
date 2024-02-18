#!/bin/sh
set -e

# Apply migrations
flask db upgrade

# Seed data if needed
flask seed all

# Start the application
exec gunicorn app:app -b 0.0.0.0:5000
