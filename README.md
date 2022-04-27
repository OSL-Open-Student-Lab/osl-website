# OSL Website API v.0.1.1
requires Python3.10^

## Run api:
```zsh
$ git clone https://github.com/timaracov/osl-fast
$ cd osl-fast
$ python3 -m venv env
$ . env/bin/activate
$ pip install -r req.txt
$ uvicorn run:run_app --debug --workers 12
```
<!-- 
## Run tests:
```zsh
$ pip install -r req-dev.txt
$ pytest
``` -->

To look through docs go to the http://localhost:8000/docs or http://localhost:8000/redoc

All static files will be accessed from http://localhost:8000/api/v1/static

---

## Author:
* [timaracov]( https://github.com/timaracov )
