FROM python:3.11-slim 

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY requirements.txt /code/

RUN pip install --no-cache-dir gunicorn
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

COPY . /code/

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 8000 

ENTRYPOINT ["/entrypoint.sh"]