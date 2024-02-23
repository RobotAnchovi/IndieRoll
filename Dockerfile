FROM python:3.9.18-alpine3.18

# Install system dependencies
RUN apk add --no-cache postgresql-dev gcc python3-dev musl-dev

# Set environment variables
# ENV FLASK_APP=app.py \
#     FLASK_ENV=production \
#     DATABASE_URL=your_database_url \
#     SCHEMA=your_schema_name \
#     SECRET_KEY=your_secret_key

# Set work directory
WORKDIR /var/www

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install psycopg2-binary  # Use psycopg2-binary to avoid compiling

# Copy application code to the container
COPY . .

# Copy entrypoint script and make it executable
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Set the entrypoint script to run on container start
ENTRYPOINT ["docker-entrypoint.sh"]

# Command to run the Flask application with Gunicorn
CMD ["gunicorn", "app:app"]
