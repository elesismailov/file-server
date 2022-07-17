const path = require('path');
const fs = require('fs');

function Adapter(dirpath) {

  this.path = path.parse(dirpath).dir;

  // recursively create dirs
  if (!fs.existsSync(this.path)) {

    fs.mkdirSync(this.path, {recursive: true})

  }

}


Adapter.prototype.getFile = function(filename) {

  /**
  *     Returns file request stream
  */

  const filepath = path.join(this.path, filename);

  try {

    const readStream = fs.createReadStream(filepath);

    return readStream

  } catch (err) {

    console.log(err)

    return err

  }

}

Adapter.prototype.createFile = function(filename) {
  /**
  * Returns a writable stream
  */

  // TODO error handling 
  
  const filepath = path.join(this.path, filename);

  const writeStream = fs.createWriteStream(filepath);

  return writeStream
}

Adapter.prototype.ls = function() {
  // returns a str list of all files
  console.log('list files')
}


module.exports = Adapter;
