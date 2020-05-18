import { getSubscribersText, getSubRedditAgeText } from './reddit.util';

describe('getSubscribersText', () => {
  test('it will return 0 subscribers for 0', () => {
    const result = getSubscribersText(0);
    expect(result).toEqual('0 subscribers');
  });

  test('it will return 1 subscriber for 1', () => {
    const result = getSubscribersText(1);
    expect(result).toEqual('1 subscriber');
  });

  test('it will return 2 subscribers for 2', () => {
    const result = getSubscribersText(2);
    expect(result).toEqual('2 subscribers');
  });
});

describe('getSubRedditAgeText', () => {
  test('it will return 1 year for 1', () => {
    const result = getSubRedditAgeText(1);
    expect(result).toEqual('a community for 1 year');
  });

  test('it will return 2 years for 2', () => {
    const result = getSubRedditAgeText(2);
    expect(result).toEqual('a community for 2 years');
  });

  test('it will return less than a year for 0', () => {
    const result = getSubRedditAgeText(0);
    expect(result).toEqual('a community for less than a year');
  });
});
