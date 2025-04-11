#!/bin/sh

if [ "$1" != "gunicorn" ]; then
  exec "$@"
fi

python manage.py migrate --noinput

exec gunicorn botiki_exam.wsgi:application --bind 0.0.0.0:8000