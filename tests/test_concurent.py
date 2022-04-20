import requests
import threading
import random

from json import loads, dumps



def generate_reg_form():
    result = {
        "username": "",
        "password1": "",
        "password2": "",
        "email": ""}

    passwd = list('QWERTYUIOPlsakdj_01!++_)(*&^%')
    username = list('wertyuioplkjhgfdsazxcvbnmQWERTYUIOOKJHGFCVBNM09876543')
    random.shuffle(passwd)
    random.shuffle(username)

    result["password1"] = "_".join(passwd)
    result["password2"] = "_".join(passwd)
    result["username"] = "".join(username)
    result["email"] = "".join(username) + "@mail.ru"

    return result


def get_docs():
    resp = requests.get('http://localhost:8000/docs')
    try:
        assert resp.status_code == 200
    except:
        print(f'not passed: {resp}')
    else:
        print(f'passed: OK')


def post_register():
    data = generate_reg_form()
    with open('login.data', 'a') as f:
        jsond = dumps(data)
        f.write(str(jsond)+'\n')

    resp = requests.post(url='http://localhost:8000/api/v1/auth/registration', json=data)
    try:
        assert resp.status_code == 200
    except:
        print(f'not passed: {resp}')
    else:
        print(f'passed: OK')


def post_login(): 
    with open('login.data', 'r') as f:
        data = random.choice([loads(a) for a in f.readlines()])
    log_form = {'username': data['username'], 'password': data['password1'], 'rememberme': True}
    resp = requests.post(url='http://localhost:8000/api/v1/auth/login', json=data)
    try:
        assert resp.status_code == 200
    except:
        print(f'not passed: {resp}')
    else:
        print(f'passed: OK')

def main_test(workers=100):
    try:
        for _ in range(workers):
            threading.Thread(target=get_docs).start()
            threading.Thread(target=post_register).start()
    except Exception as err:
        print(f'shit: {err}')

if __name__ == '__main__':
    main_test(workers=1000)
