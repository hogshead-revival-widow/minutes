FROM python:3.9-alpine
ADD settings settings
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN apk add build-base
RUN apk add --no-cache libffi-dev
RUN apk add --no-cache supervisor \
    && python -m pip install --upgrade pip \
    && pip install -r /code/requirements.txt
COPY ./ /code/
RUN pip install -e .
#ENV ENV_FOR_MINUTES=production
EXPOSE 8000
CMD ["minutes", "--no-reload", "--host", "0.0.0.0"]



