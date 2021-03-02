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

class Validator {
  constructor(type) {
    this.rules = {};
    if (type) {
      this.type = type;
      this.rules[type] = {};
    }
  }

  string() {
    return new Validator('string');
  }

  number() {
    return new Validator('number');
  }

  array() {
    return new Validator('array');
  }

  object() {
    return new Validator('object');
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

  isValid(val) {
    return Object.entries(this.rules)
      .every(([rule, params]) => validators[rule](val, params));
  }
}

export default Validator;
