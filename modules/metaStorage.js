
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const File = require('../models/file');

const metaStorage = {};

metaStorage.createMetaData = function(filepath) {

  console.log(filepath)

  const parsed = path.parse(filepath);

  const filename = parsed.name + parsed.ext;

  const stat = fs.statSync(filepath);

  // creating mime data
  const file = new File({
    name: filename, 
    dir: parsed.dir,
    type: mime.lookup(filepath),
    size: stat.size,
    cDate: stat.birthtime,
    mDate: stat.mtime,
  });

  file.save((err) => {
    if (err) {
      // console.log(err)
      throw err
      return null
    }
    console.log(file)
    return file
  });

}

metaStorage.getMetaData = function(filepath) {


}


module.exports = metaStorage;
