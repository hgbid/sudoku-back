FROM python:3-alpine

WORKDIR /app

COPY . .

CMD ["python", "-c", "script.py"]
