from validate_email import validate_email
import re

def _validate_login_request_data(data):
    if len(data) > 3:
        return 'Too many fields in request body'
    username = data.get('username')
    passwd = data.get('password')
    rememberme = data.get('rememberme')

    if not username:
        return 'Username field is empty'
    if not passwd:
        return 'Password field is empty'
    if rememberme == None:
        return 'Rememberme field is empty'

    invalid_username = __validate_username(username)
    if invalid_username: 
        return invalid_username

    invalid_passwd = __validate_password(passwd)
    if invalid_passwd:
        return invalid_passwd

    invalid_remember = __validate_rememberme(rememberme)
    if invalid_remember:
        return invalid_remember

def _validate_register_request_data(data):
    if len(data) > 4:
        return 'Too many fields in request body'

    email = data.get('email')
    username = data.get('username')
    passwd = data.get('password')
    passwd2 = data.get('password_repeat')

    if not email:
        return 'Email field is empty'
    if not username:
        return 'Username field is empty'
    if not passwd:
        return 'Password field is empty'
    if not passwd2:
        return 'Password repeat field is empty'
  
    invalid_username = __validate_username(username)
    if invalid_username: 
        return invalid_username

    if not validate_email(email):
        return 'Email format is invalid'
    
    if passwd != passwd2:
        return 'Passwords must be the same'
    
    invalid_passwd = __validate_password(passwd)
    invalid_passwd2 = __validate_password(passwd2)
    if invalid_passwd and invalid_passwd2:
        return invalid_passwd


def _validate_query_request_data(data):
    pass


def __validate_password(password):
    if len(password) < 8:
        return 'Password is too short'
    if password.isalnum():
        return 'Password must contain characters and numbers'
    if password.isdigit():
        return 'Password must contain characters'
    if password.isalpha():
        return 'Password must contain numbers'
    if password.islower():
        return 'Password must contain characters in upper case'
    if password.isupper():
        return 'Password must contain characters in lower case'
    if not any((char in list('!@#$%^&*()-=_+')) for char in password):
        return 'Password must contain special characters'

def __validate_username(username):
    if len(username) < 8:
        return 'Username is too short'
    if username[0].isnumeric():
        return 'Username can not start with number'
    if any((char in list('@#$%^&*() -=_+')) for char in username):
        return 'Username must contain only numbers and characters'

def __validate_rememberme(remember):
    if remember != True and remember != False:
        return 'Invalid format of remember me field'

