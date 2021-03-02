import { test, expect } from '@jest/globals';
import Validator from '@hexlet/code';

test('String', () => {
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

test('Number', () => {
  const v = new Validator();

  const schema = v.number();

  expect(schema.isValid(null)).toBeTruthy();

  schema.required();

  expect(schema.isValid(null)).toBeFalsy();
  expect(schema.isValid(7)).toBeTruthy();

  expect(schema.positive().isValid(10)).toBeTruthy();

  schema.range(-5, 5);

  expect(schema.isValid(-3)).toBeFalsy();
  expect(schema.isValid(5)).toBeTruthy();

  schema.range(1, 2);

  expect(schema.isValid(5)).toBeFalsy();
});

test('Array', () => {
  const v = new Validator();

  const schema = v.array();

  expect(schema.isValid(null)).toBeFalsy();

  schema.required();

  expect(schema.isValid([])).toBeTruthy();
  expect(schema.isValid(['hexlet'])).toBeTruthy();

  schema.sizeof(2);

  expect(schema.isValid(['hexlet'])).toBeFalsy();
  expect(schema.isValid(['hexlet', 'code-basics'])).toBeTruthy();

  schema.sizeof(3);

  expect(schema.isValid(['hexlet', 'code-basics'])).toBeFalsy();
});
