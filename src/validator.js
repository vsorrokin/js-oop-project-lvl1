import validators from './validators';

const checkType = (actualType, goalType) => {
  if (!goalType) {
    if (!actualType) {
      throw new Error('You must set type first');
    } else {
      return;
    }
  }

  if (goalType !== actualType) {
    throw new Error(`You must set type .${goalType}() first`);
  }
};

const customValidators = {};

class Validator {
  constructor(type) {
    this.rules = {};
    this.validators = {};
    if (type) {
      this.type = type;
      this.rules[type] = {};
    }
  }

  string() {
    return new this.constructor('string');
  }

  number() {
    return new this.constructor('number');
  }

  array() {
    return new this.constructor('array');
  }

  object() {
    return new this.constructor('object');
  }

  required() {
    checkType(this.type);
    this.rules.required = {};
    return this;
  }

  contains(str) {
    checkType(this.type, 'string');
    this.rules.contains = { str };
    return this;
  }

  positive() {
    checkType(this.type, 'number');
    this.rules.positive = {};
    return this;
  }

  range(from, to) {
    checkType(this.type, 'number');
    this.rules.range = {
      from, to,
    };
    return this;
  }

  sizeof(size) {
    checkType(this.type, 'array');
    this.rules.sizeof = { size };
    return this;
  }

  shape(shape) {
    checkType(this.type, 'object');
    this.rules.shape = { shape };
    return this;
  }

  static addCustomValidator(type, name, fn) {
    customValidators[name] = { type, fn };
  }

  addValidator(type, name, fn) {
    this.constructor.addCustomValidator(type, name, fn);
  }

  test(name, ...params) {
    const { type, fn } = customValidators[name];
    if (type !== this.type) {
      throw new Error(`Custom validator "${name}" is not applicable to "${this.type}" type`);
    }

    this.rules.test = [
      ...(this.rules.test || []),
      (val) => fn(val, params),
    ];

    return this;
  }

  isValid(val) {
    return Object.entries(this.rules)
      .every(([rule, params]) => validators[rule](val, params));
  }
}

export default Validator;
