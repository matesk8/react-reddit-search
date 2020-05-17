import { generateQueryString } from './queryGenerator.util';

describe('generateQueryString', () => {

  test('it will create a valid query string', () => {
    const queryObject = {
      numberValue: 123,
      textValue: 'abc',
      boolValue: true,
    };
    const expectedResult = 'numberValue=123&textValue=abc&boolValue=true';
    const result = generateQueryString(queryObject);
    expect(result).toEqual(expectedResult);
  });
});
