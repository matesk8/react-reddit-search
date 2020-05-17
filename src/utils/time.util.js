const getYearDifferenceFromNow = (date) => {
  const difference = Date.now() - date;
  const differenceDate = new Date(difference);
  const firstYearInJs = 1970;
  return Math.abs(differenceDate.getUTCFullYear() - firstYearInJs);
};

const unixTimeStampToMilliseconds = (unixTimeStamp) => new Date(unixTimeStamp * 1000);

export {
  getYearDifferenceFromNow,
  unixTimeStampToMilliseconds,
};
