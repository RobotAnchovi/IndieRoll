FROM python:3.9.18-alpine3.18

RUN apk update && apk add build-base postgresql-dev gcc python3-dev musl-dev


ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV DATABASE_URL=postgres://app_academy_projects_7wv5_user:c2V7Ujo7yPB9kmfhQI8sjdNlaOUU39KJ@dpg-cn80s4q1hbls73d85k5g-a.ohio-postgres.render.com/app_academy_projects_7wv5
ENV SCHEMA=Indie_Roll
ENV SECRET_KEY=a4ef0ddb6a3480b1aa854d6e846ddde6

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

RUN flask db downgrade base
RUN flask db migrate -m "Initial Migration"
RUN flask db upgrade
RUN flask seed all
CMD gunicorn app:app
