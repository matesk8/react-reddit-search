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

  test('it will ignore empty parameters', () => {
    const queryObject = {
      numberValue: 123,
      textValue: null,
    };
    const expectedResult = 'numberValue=123';
    const result = generateQueryString(queryObject);
    expect(result).toEqual(expectedResult);
  });

  test('it will return an empty string on a null value', () => {
    const result = generateQueryString(null);
    expect(result).toEqual('');
  });

  test('it will return an empty string on a number value', () => {
    const result = generateQueryString(123);
    expect(result).toEqual('');
  });

  test('it will return an empty string on a string value', () => {
    const result = generateQueryString('123');
    expect(result).toEqual('');
  });
});
