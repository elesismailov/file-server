
const Adapter = require('./fileAdapter');
const fileStorage = {};

fileStorage.createAdapter = function(path) {

  console.log('created adapter ' + path)

  return new Adapter(path);

}


module.exports = fileStorage;
