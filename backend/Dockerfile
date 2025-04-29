FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code

# Копіюємо requirements.txt та entrypoint.sh на самому початку
COPY requirements.txt entrypoint.sh ./

# Встановлюємо залежності
RUN pip install --upgrade pip \
 && pip install --no-cache-dir gunicorn \
 && pip install --no-cache-dir -r requirements.txt \
 && chmod +x /code/entrypoint.sh

# Копіюємо решту коду (щоб не перезаписати entrypoint.sh)
COPY . .

EXPOSE 8000

ENTRYPOINT ["/code/entrypoint.sh"]
