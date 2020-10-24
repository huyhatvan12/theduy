import moment from 'moment';

class DateService {
  static msToDate = ms => moment.utc(ms).format('DD-MM-YYYY');
  static yesterday = () => moment().subtract(1, 'days');
}

export default DateService;