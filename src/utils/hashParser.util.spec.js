import { getHashParameters } from './hashParser.util';

describe('getHashParameters', () => {
  test('it will create a hash mapping object from a hash string', () => {
    const hashString = '#access_token=123&token_type=bearer&state=543&expires_in=3600&scope=read';
    const expectedResult = {
      access_token: '123',
      token_type: 'bearer',
      state: '543',
      expires_in: '3600',
      scope: 'read',
    };
    const result = getHashParameters(hashString);
    expect(result).toEqual(expectedResult);
  });

  test('it will create an empty object on null', () => {
    const result = getHashParameters(null);
    expect(result).toEqual({});
  });

  test('it will create an empty object on a number', () => {
    const result = getHashParameters(123);
    expect(result).toEqual({});
  });
});
