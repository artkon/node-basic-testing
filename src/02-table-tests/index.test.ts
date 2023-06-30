import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: 'invalid action', expected: null },
  { a: 'invalid value', b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should calculate two numbers %o',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });

      expect(result).toBe(expected);
    },
  );
});
