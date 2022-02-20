import sqlite3

from datetime import datetime, timedelta
from time import sleep


connection = sqlite3.connect('../database/site.db')
curs = connection.cursor()

bookings = list(curs.execute('SELECT * FROM FacilityBooking'))

while True:
    try:
        bookings = list(curs.execute('SELECT * FROM FacilityBooking'))
    except Exception as err:
        print(f'[DATABASE ERROR]: {err}')
    
    try:
        print('[INFO]: Removing old bookings...')
        for bk in bookings:
            if datetime.strptime(str(bk[2]), r'%Y-%m-%d %H:%M:%S.%f') < (datetime.now() - timedelta(minutes=30)):
                print(f'\t[INFO]: Deleting {bk[0]} booking...')
                bookings.remove(bk)
                print('\t[INFO]: Deleted')
    except Exception as err:
        print(f'[ERROR]: {err}')
    else:
        print('[INFO]: Old bookings successfully deleted')
        print('[INFO]: Bookings remain: ')
        for el in bookings:
            print(f'[{el[0]}] -> {el[1:]}')
        print('[INFO]: Looking for expiring bookings...')

    try:
        for bk in bookings:
            current_delta = datetime.now() - datetime.strptime(str(bk[2]), r'%Y-%m-%d %H:%M:%S.%f')
            print(f'\n[CHECK]: Checking booking [{bk[0]}]')
            print(f'--> NOW:          {datetime.now()}')
            print(f'--> BOOKING TIME: {datetime.strptime(str(bk[2]), r"%Y-%m-%d %H:%M:%S.%f")}')
            print(f'--> TIMEDELTA:    {current_delta}')

            if current_delta.days == 0 and current_delta.seconds < 1740:
                print(f'\t[WARNING]: [{bk[0]}] booking will expire after {timedelta(minutes=30)-current_delta}')
            if current_delta.seconds > 1740 and current_delta.days >= 0:
                print(f'\t[WARNING]: [{bk[0]}] booking has expired, removing...')
                try:
                    curs.execute('DELETE FROM FacilityBooking Where id=?', (bk[0], ))
                    connection.commit()
                except Exception as err:
                    print(f'\t[ERROR]: Unable to remove booking: {err}')
                else:
                    print(f'\t[INFO]: Booking was succussfully removed')
    except Exception as err:
        print(f'[ERROR]: {err}')
    else:
        print('[INFO]: END OF CKECKING')
        sleep(1)

    print('\n[INFO]: NEXT CHECKING')
