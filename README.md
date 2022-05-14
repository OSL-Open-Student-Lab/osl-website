# OSL Website API v.0.1.1
requires Python3.10^

## Run api:
```zsh
$ git clone https://github.com/OSL-Open-Student-Lab/osl-website
$ cd osl-fast
$ python3 -m venv env
$ . env/bin/activate
$ pip install -r req.txt
$ uvicorn run:app --debug --workers 4
```
<!-- 
## Run tests:
```zsh
$ pip install -r req-dev.txt
$ pytest
``` -->

You can find OpenAPI generated docs at http://localhost:8000/docs or http://localhost:8000/redoc

All static files can be accessed at http://localhost:8000/api/v1/static

---

## Author:
* [timaracov]( https://github.com/timaracov )
