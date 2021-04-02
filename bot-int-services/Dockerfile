FROM python:3.9.1

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5001 5002

CMD [ "python3","-u", "./app.py" ]