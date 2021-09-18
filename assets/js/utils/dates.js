import moment from 'moment';

const momentFromString = function(date, fromFormat = null) {
  if (fromFormat) return moment(date, fromFormat, true);
  if (date) return moment(date);
  return null;
};

const DWMDY = 'ddd, MM/DD/YY';
const MDY = 'MM/DD/YYYY';
const HMTT = 'h:mm a';
const HM = 'HH:mm';
const MD = 'MM/DD';
const YMD = 'YYYY-MM-DD';
const MDYMilitary = 'MM-DD-YY HH:mm:ss';

const VALID_DATE_FORMAT_LIST = [
  DWMDY, MDY, MD, YMD, MDYMilitary
]

const verifyDate = (s) => {
  if (!s) return null;
  const test = moment(s, VALID_DATE_FORMAT_LIST);
  return test.isValid() ? test : null;
};

export default {
  DWMDY, MDY, HMTT, HM, MD, YMD, MDYMilitary,
  isValidDate(dateString) {
    if (!dateString) {
      return false;
    }
    if (!moment(dateString, MDY, true).isValid()) {
      return false;
    }
    return true;
  },
  calculateDuration(timeSetAt, format) {
    if (!timeSetAt) {
      return 0;
    }
    if (!moment(timeSetAt, format, true).isValid()) {
      return 0;
    }
    const timeValue = momentFromString(timeSetAt, format)
    return moment(timeValue).fromNow();
  },
  isValidTime(timeString) {
    if (!timeString) {
      return false;
    }
    if (!moment(timeString, HM, true).isValid()) {
      return false;
    }
    return true;
  },
  getSelectedDate(date, fmt = null) {
    if (date) {
      return fmt ? moment(date, fmt) : moment(date);
    }
    return null;
  },
  toMDY(d, fromFormat = null) {
    if (!d) return '';
    return momentFromString(d, fromFormat).format(MDY);
  },

  toDWMDY(d, fromFormat = null) {
    if (!d) return '';
    return momentFromString(d, fromFormat).format(DWMDY);
  },

  toHMTT(d, fromFormat = null) {
    if (!d) return '';
    return momentFromString(d, fromFormat).format(HMTT);
  },

  toHM(d, fromFormat = null) {
    if (!d) return '';
    return momentFromString(d, fromFormat).format(HM);
  },

  toLongDateTime(d, fromFormat = null) {
    if (!d) return '';
    return momentFromString(d, fromFormat).format('ddd, MM/DD/YY h:mm a');
  },

  toMD(d, fromFormat = null) {
    if (!d) return '';
    return momentFromString(d, fromFormat).format(MD);
  },

  toYMD(d, fromFormat = null) {
    if (!d) return '';
    return momentFromString(d, fromFormat).format(YMD);
  },
  momentFromString,
  parseDatePickerDate(s, fmt = YMD) {
    const validated = verifyDate(s);
    if (validated) {
      return validated.format(fmt);
    } else {
      return s;
    }
  },
};
