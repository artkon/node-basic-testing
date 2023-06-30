import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const input = [1];
    const expectedResult = { value: 1, next: { value: null, next: null } };
    const result = generateLinkedList(input);

    expect(result).toStrictEqual(expectedResult);
  });

  test('should generate linked list from values 2', () => {
    const input = [2, 1];
    const result = generateLinkedList(input);

    expect(result).toMatchSnapshot();
  });
});
