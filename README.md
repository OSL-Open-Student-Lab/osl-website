# OSL Website API v.0.1
## Run application locally(For frontend devs)

```bash
# Set virtual enviroment and nstall dependeces
$ git clone https://github.com/timaracov/osl.git

$ cd osl

$ python3 -m venv env

$ . env/bin/activate

$ pip install -r requirements.txt

# Run api with gunicorn
$ gunicorn setup:create_app

# Or with pure flask
$ export FLASK_APP=setup

$ export FLASK_ENV=development

$ flask run
```

## Authors:
+ [timaracov](https://github.com/timaracov)
