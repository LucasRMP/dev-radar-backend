module.exports = function parseStringAsArray(str) {
  return str.split(',').map(tech => tech.trim());
};
