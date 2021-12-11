import requests
import datetime

#get_t = requests.get("http://localhost:5000/api/query")
#print(get_t)

print(datetime.datetime(2021, 12, 11, 14, 15))

reg_resp = requests.post("http://localhost:5000/api/auth/register", data={
    "username":"tim",
    "email":"neyenburgz@mail.ru",
    "password":"123",
    "confirm_password":"123"
})

print(reg_resp.text)

login_resp = requests.post("http://localhost:5000/api/auth/login", data={
    "username":"tima1232",
    "password":"123"
})

print(login_resp.text)

resp = requests.post("http://localhost:5000/api/query", data={
        "user_id":1,
        "from_date":datetime.datetime(2021, 12, 11, 14, 15),
        "to_date":datetime.datetime(2021, 12, 12, 14, 15),
        "facility_id":2
    })

print(resp.text )
