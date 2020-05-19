import { getCreatedTimeAgoText } from './time.util';

describe('getCreatedTimeAgoText', () => {
  test('should return 5 minutes ago for 5 minute difference', () => {
    const date1 = new Date('1989-09-04T03:20:00');
    const date2 = new Date('1989-09-04T03:25:00');
    const result = getCreatedTimeAgoText(date1, date2);
    expect(result).toEqual('5 minutes ago');
  });

  test('should return 1 hour ago for 1 hour difference', () => {
    const date1 = new Date('1989-09-04T03:20:00');
    const date2 = new Date('1989-09-04T02:20:00');
    const result = getCreatedTimeAgoText(date1, date2);
    expect(result).toEqual('1 hour ago');
  });

  test('should return 15 days ago for 15 days difference', () => {
    const date1 = new Date('1989-01-01T03:55:00');
    const date2 = new Date('1989-01-16T04:10:00');
    const result = getCreatedTimeAgoText(date1, date2);
    expect(result).toEqual('15 days ago');
  });

  test('should return 1 month ago 1 for month difference', () => {
    const date1 = new Date('1989-01-01T03:55:00');
    const date2 = new Date('1989-02-16T03:10:00');
    const result = getCreatedTimeAgoText(date1, date2);
    expect(result).toEqual('1 month ago');
  });

  test('should return 2 years ago for 2 years difference', () => {
    const date1 = new Date('1989-01-01T03:55:00');
    const date2 = new Date('1991-03-16T03:10:00');
    const result = getCreatedTimeAgoText(date1, date2);
    expect(result).toEqual('2 years ago');
  });
});
