FROM python:3.9.18-alpine3.18

# Install system dependencies
RUN apk add --no-cache postgresql-dev gcc python3-dev musl-dev

# Set environment variables
ENV FLASK_APP=app \
    FLASK_ENV=production \
    DATABASE_URL=postgres://app_academy_projects_7wv5_user:c2V7Ujo7yPB9kmfhQI8sjdNlaOUU39KJ@dpg-cn80s4q1hbls73d85k5g-a.ohio-postgres.render.com/app_academy_projects_7wv5 \
    SCHEMA=logan_indie_roll \
    SECRET_KEY=SECRET_KEY \
    S3_KEY=AKIAXYKJTCTBTRSZUPAJ \
    S3_SECRET=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 \
    S3_BUCKET=indieroll-bucket

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
