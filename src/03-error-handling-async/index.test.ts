// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const prop = 'prop';
    const result = await resolveValue(prop);

    expect(result).toBe(prop);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const providedErrorMessage = 'providedErrorMessage';
    const throwingFunction = () => throwError(providedErrorMessage);
    const expected = new Error(providedErrorMessage);

    expect(throwingFunction).toThrow(expected);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultErrorMessage = 'Oops!';
    const throwingFunction = () => throwError();
    const expected = new Error(defaultErrorMessage);

    expect(throwingFunction).toThrow(expected);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const throwingFunction = () => throwCustomError();
    const expected = new MyAwesomeError();

    expect(throwingFunction).toThrow(expected);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const expected = new MyAwesomeError();

    await expect(rejectCustomError).rejects.toThrow(expected);
  });
});
