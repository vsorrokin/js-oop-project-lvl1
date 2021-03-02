export default {
  string(val) {
    return typeof val === 'string';
  },

  required(val) {
    return val !== undefined && val !== null && val !== '';
  },

  contains(val, { str }) {
    return val.includes(str);
  },

  number(val) {
    return typeof val === 'number' || val === null;
  },

  positive(val) {
    return val > 0;
  },

  range(val, { from, to }) {
    return val >= from && val <= to;
  },
};
