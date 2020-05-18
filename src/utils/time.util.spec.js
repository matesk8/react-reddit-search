import { getMinutesDifference } from './time.util';

describe('getMinutesDifference', () => {
  test('should return 5 for 5 minute difference', () => {
    const date1 = new Date('1989-09-04T03:20:00');
    const date2 = new Date('1989-09-04T03:25:00');
    const result = getMinutesDifference(date1, date2);
    expect(result).toEqual(5);
  });

  test('should return 0 for 0 minute difference', () => {
    const date1 = new Date('1989-09-04T03:20:00');
    const date2 = new Date('1989-09-04T03:20:00');
    const result = getMinutesDifference(date1, date2);
    expect(result).toEqual(0);
  });

  test('should return 15 for 15 minute difference', () => {
    const date1 = new Date('1989-09-04T03:55:00');
    const date2 = new Date('1989-09-04T04:10:00');
    const result = getMinutesDifference(date1, date2);
    expect(result).toEqual(15);
  });
});
