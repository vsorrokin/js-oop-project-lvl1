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
    return val > 0 || val === null;
  },

  range(val, { from, to }) {
    return val >= from && val <= to;
  },

  array(val) {
    return Array.isArray(val);
  },

  sizeof(val, { size }) {
    return val.length === size;
  },

  object(val) {
    return typeof val === 'object' && val !== null;
  },

  shape(val = {}, { shape }) {
    return Object.entries(shape)
      .every(([key, v]) => v.isValid(val[key]));
  },
};
