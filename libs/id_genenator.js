const FlakeIdGen = require('flake-idgen');
const intFormat = require('biguint-format');
const flakeGenerator = new FlakeIdGen();

exports.generateId = () => {
  return intFormat(flakeGenerator.next(), 'dec');
};