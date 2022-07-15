const path = require('path');
const fs = require('fs');

function Adapter(dirpath) {

  this.path = path.parse(dirpath).dir;

}


Adapter.prototype.getFile = function(filename) {
  // returns a file stream
  console.log('get file')

  const filepath = path.join(this.path, filename);

  const readStream = fs.createReadStream(filepath);

  return readStream

}

Adapter.prototype.createFile = function(filename, stream) {
  // creates file
  console.log('create file')
}

Adapter.prototype.ls = function() {
  // returns a str list of all files
  console.log('list files')
}


module.exports = Adapter;
