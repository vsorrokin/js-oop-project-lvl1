// @ts-check

import validators from './validators';

class Validator {
  constructor() {
    this.rules = {};
  }

  string() {
    this.rules.string = {};
    return this;
  }

  contains(str) {
    this.rules.contains = { str };
    return this;
  }

  required() {
    this.rules.required = {};
    return this;
  }

  isValid(val) {
    return Object.entries(this.rules)
      .every(([rule, params]) => validators[rule](val, params));
  }
}

export default Validator;
