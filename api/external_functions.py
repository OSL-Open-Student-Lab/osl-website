
def _convert_error(err):
    num_of_err = int(str(err).split('\n')[0][0])
    err_list = str(err).split('\n')[1:]
    result = []
    for i in range(0, num_of_err*2, 2):
        result.append(f'{err_list[i]}: {" ".join(err_list[i+1].split()[:-1])}')
    return result


def _validate_time(strtime):
    import datetime
    try:
        invalid_time = bool(datetime.datetime.strptime(strtime, '%d-%m-%Y'))
    except ValueError:
        invalid_time = False
    if not invalid_time:
        return 'Invalid date format'


def _str_to_time(st):
    import datetime
    return datetime.datetime.strptime(st, "%d-%m-%Y %H:%M")
