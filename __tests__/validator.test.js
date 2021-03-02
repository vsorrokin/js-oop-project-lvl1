import { test, expect } from '@jest/globals';
import Validator from '@hexlet/code';

test('Required, string, contains', () => {
  const v = new Validator();

  const schema = v.string();

  expect(schema.isValid('')).toBeTruthy();

  schema.required();

  expect(schema.isValid('what does the fox say')).toBeTruthy();
  expect(schema.isValid('hexlet')).toBeTruthy();
  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.isValid('')).toBeFalsy();

  expect(schema.contains('what').isValid('what does the fox say')).toBeTruthy();
  expect(schema.contains('whatthe').isValid('what does the fox say')).toBeFalsy();
  expect(schema.contains('what').isValid('what does the fox say')).toBeTruthy();
});
