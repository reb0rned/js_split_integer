'use strict';

const splitInteger = require('./splitInteger');

const assertionFunc = (value, numberOfParts) => {
  const result = splitInteger(value, numberOfParts);

  expect(result).toHaveLength(numberOfParts);

  for (let i = 0; i < result.length - 1; i++) {
    expect(result[i + 1]).toBeGreaterThanOrEqual(result[i]);
  }

  const maxNumber = Math.max(...result);
  const minNumber = Math.min(...result);

  expect(maxNumber - minNumber).toBeLessThanOrEqual(1);

  return result;
};

test(`should split a number into equal parts
  if a value is divisible by a numberOfParts`, () => {
  expect(assertionFunc(6, 2)).toEqual([3, 3]);
});

test(`should return a part equals to a value
  when splitting into 1 part`, () => {
  expect(assertionFunc(8, 1)).toEqual([8]);
});

test('should sort parts ascending if they are not equal', () => {
  const result = assertionFunc(5, 6);

  expect(result).toContain(0);
});

test('should add zeros if value < numberOfParts', () => {
  const result = assertionFunc(32, 6);

  expect(result).toEqual([5, 5, 5, 5, 6, 6]);
});
