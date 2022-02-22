# OSL Website API

## Run application locally 
```bash

  git clone https://github.com/timaracov/osl.git
  
  cd osl
  
  pip install -r requirements.txt # you can use python venv

  gunicorn "setup:create_app()"
```

## Deploy on Heroku
To deploy app on heroku please use the offcial guide for python deployment https://devcenter.heroku.com/articles/getting-started-with-python

## Authors

- [@timaracov](https://www.github.com/timaracov)
