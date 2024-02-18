FROM python:3.9.18-alpine3.18

RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

WORKDIR /var/www

COPY requirements.txt .

RUN python -m venv venv
ENV PATH="/var/www/venv/bin:$PATH"

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir psycopg2

COPY . .

# You can handle migrations and other setup steps in an entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Set permissions if needed
# RUN chown -R youruser:yourgroup /var/www



# Use CMD to start your application
CMD ["docker-entrypoint.sh"]
