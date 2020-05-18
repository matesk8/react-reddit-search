const getYearDifferenceFromNow = (date) => {
  const difference = Date.now() - date;
  const differenceDate = new Date(difference);
  const firstYearInJs = 1970;
  return Math.abs(differenceDate.getUTCFullYear() - firstYearInJs);
};

const unixTimeStampToMilliseconds = (unixTimeStamp) => new Date(unixTimeStamp * 1000);

const getMinutesDifference = (date1, date2) => {
  const difference = date1 - date2;
  return Math.abs(Math.round(((difference % 86400000) % 3600000) / 60000));
};

export {
  getYearDifferenceFromNow,
  unixTimeStampToMilliseconds,
  getMinutesDifference,
};
