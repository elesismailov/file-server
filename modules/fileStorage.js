
const Adapter = require('./fileAdapter');
const fileStorage = {};

fileStorage.createAdapter = function(path) {

  return new Adapter(path);

}


module.exports = fileStorage;
