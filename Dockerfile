FROM python:3.9.18-alpine3.18

RUN apk update && apk add build-base postgresql-dev gcc python3-dev musl-dev


ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV DATABASE_URL=postgres://logan_fate_appacademy_projects_user:TJ2Q6uAYVn066pM0H1AS4JgaCYmzoHlZ@dpg-cmcasgf109ks738to29g-a.ohio-postgres.render.com/logan_fate_appacademy_projects
ENV SCHEMA=Indie_Roll
ENV SECRET_KEY=a4ef0ddb6a3480b1aa854d6e846ddde6

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

RUN flask db upgrade
RUN flask seed all
CMD gunicorn app:app
