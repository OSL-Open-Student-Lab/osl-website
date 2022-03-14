import * as dayjs from 'dayjs'
import localeDataPlugin from 'dayjs/plugin/localeData'
import isoWeekPlugin from 'dayjs/plugin/isoWeek'
import isToddayPlugin from 'dayjs/plugin/isToday'
import advanceddFormatPlugin from 'dayjs/plugin/advancedFormat'
import isSameOrBeforePlugin from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfterPlugin from 'dayjs/plugin/isSameOrAfter'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/ru'

dayjs.extend(localeDataPlugin)
dayjs.extend(isoWeekPlugin)
dayjs.extend(isToddayPlugin)
dayjs.extend(advanceddFormatPlugin)
dayjs.extend(isSameOrBeforePlugin)
dayjs.extend(isSameOrAfterPlugin)
dayjs.extend(customParseFormat)
dayjs.locale('ru')
