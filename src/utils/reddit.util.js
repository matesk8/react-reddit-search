const getSubscribersText = (numberOfSubscribers) => {
  if (!numberOfSubscribers) { return '0 subscribers'; }
  const subscribersPostFix = numberOfSubscribers > 1 ? 'subscribers' : 'subscriber';
  return `${numberOfSubscribers.toLocaleString()} ${subscribersPostFix}`;
};

const getSubRedditAgeText = (redditAge) => {
  const agePostfix = redditAge > 1 ? 'years' : 'year';
  if (redditAge >= 1) {
    return `a community for ${redditAge} ${agePostfix}`;
  }
  return 'a community for less than a year';
};

export {
  getSubRedditAgeText,
  getSubscribersText,
};
