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
};
