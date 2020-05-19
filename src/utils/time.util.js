const moment = require('moment');
require('moment-precise-range-plugin');

const getYearDifferenceFromNow = (date) => {
  const difference = Date.now() - date;
  const differenceDate = new Date(difference);
  const firstYearInJs = 1970;
  return Math.abs(differenceDate.getUTCFullYear() - firstYearInJs);
};

const unixTimeStampToMilliseconds = (unixTimeStamp) => new Date(unixTimeStamp * 1000);

const getCreatedTimeAgoText = (date1, date2) => {
  const momentDate1 = moment(date1);
  const momentDate2 = moment(date2);
  const difference = moment.preciseDiff(momentDate1, momentDate2, true);
  const {
    minutes, hours, days, months, years
  } = difference;
  const yearText = years > 1 ? 'years' : 'year';
  const monthsText = months > 1 ? 'months' : 'month';
  const daysText = days > 1 ? 'days' : 'day';
  const hoursText = hours > 1 ? 'hours' : 'hour';
  const minutesText = minutes > 1 ? 'minutes' : 'minute';

  if (years >= 1) {
    return `${years} ${yearText} ago`;
  }
  if (months >= 1) {
    return `${months} ${monthsText} ago`;
  }
  if (days >= 1) {
    return `${days} ${daysText} ago`;
  }
  if (hours >= 1) {
    return `${hours} ${hoursText} ago`;
  }
  return `${minutes} ${minutesText} ago`;
};

export {
  getYearDifferenceFromNow,
  unixTimeStampToMilliseconds,
  getCreatedTimeAgoText,
};
