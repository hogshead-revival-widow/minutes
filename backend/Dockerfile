FROM python:3.9-alpine
ADD settings settings
WORKDIR /code
COPY ./ /code
RUN apk add build-base
RUN pip install -e .
CMD ["minutes", "--no-reload", "--host", "0.0.0.0"]



