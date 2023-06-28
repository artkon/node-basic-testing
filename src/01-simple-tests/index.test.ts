import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const props = { a: 1, b: 2, action: Action.Add };
    const expectedResult = 3;
    const result = simpleCalculator(props);

    expect(result).toBe(expectedResult);
  });

  test('should subtract two numbers', () => {
    const props = { a: 1, b: 2, action: Action.Subtract };
    const expectedResult = -1;
    const result = simpleCalculator(props);

    expect(result).toBe(expectedResult);
  });

  test('should multiply two numbers', () => {
    const props = { a: 2, b: 3, action: Action.Multiply };
    const expectedResult = 6;
    const result = simpleCalculator(props);

    expect(result).toBe(expectedResult);
  });

  test('should divide two numbers', () => {
    const props = { a: 6, b: 3, action: Action.Divide };
    const expectedResult = 2;
    const result = simpleCalculator(props);

    expect(result).toBe(expectedResult);
  });

  test('should exponentiate two numbers', () => {
    const props = { a: 2, b: 3, action: Action.Exponentiate };
    const expectedResult = 8;
    const result = simpleCalculator(props);

    expect(result).toBe(expectedResult);
  });

  test('should return null for invalid action', () => {
    const props = { a: 2, b: 3, action: 'invalid action' };
    const expectedResult = null;
    const result = simpleCalculator(props);

    expect(result).toBe(expectedResult);
  });

  test('should return null for invalid arguments', () => {
    const props = { a: 'a', b: 'b', action: Action.Add };
    const expectedResult = null;
    const result = simpleCalculator(props);

    expect(result).toBe(expectedResult);
  });
});
