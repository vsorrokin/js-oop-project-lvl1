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

test('Shape', () => {
  const v = new Validator();

  const schema = v.object();

  schema.shape({
    name: v.string().required(),
    age: v.number().positive(),
  });

  expect(schema.isValid({ name: 'kolya', age: 100 })).toBeTruthy();
  expect(schema.isValid({ name: 'maya', age: null })).toBeTruthy();
  expect(schema.isValid({ name: '', age: null })).toBeFalsy();
  expect(schema.isValid({ name: 'ada', age: -5 })).toBeFalsy();

  schema.shape({
    name: v.string().required(),
    age: v.number().range(110, 150),
  });

  expect(schema.isValid({ name: 'kolya', age: 100 })).toBeFalsy();
});

test('Custom', () => {
  const v = new Validator();

  const fn = (value, start) => value.startsWith(start);

  v.addValidator('string', 'startWith', fn);

  const schema = v.string().test('startWith', 'H');
  expect(schema.isValid('exlet')).toBeFalsy();
  expect(schema.isValid('Hexlet')).toBeTruthy();

  const fn2 = (value, min) => value >= min;
  v.addValidator('number', 'min', fn2);

  const schema2 = v.number().test('min', 5);
  expect(schema2.isValid(4)).toBeFalsy();
  expect(schema2.isValid(6)).toBeTruthy();
});
