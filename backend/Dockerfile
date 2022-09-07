FROM python:3.9
ADD settings settings
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./ /code/
RUN pip install -e .
#ENV ENV_FOR_MINUTES=production
EXPOSE 8000
CMD ["minutes", "--no-reload", "--host", "0.0.0.0"]



