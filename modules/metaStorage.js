
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const File = require('../models/file');

const metaStorage = {};

metaStorage.createMetaData = function(filepath, options) {

  const parsed = path.parse(filepath);

  const filename = parsed.name + parsed.ext;

  const stat = fs.statSync(filepath);

  const mimeType = options ? options.type : mime.lookup(filepath);

  File.findOne({fullPath: filepath}, (err, resFile) => {
    if (err) {
      console.log(err)
      return 
    }

    // create new meta data
    if (resFile == null) {

      // creating mime data
      const file = new File({

        name: filename, 
        dir: parsed.dir,
        fullPath: filepath,
        type: mimeType,
        size: stat.size,
        cDate: stat.birthtime,
        mDate: stat.mtime,

      });

      file.save((err) => {
        if (err) console.log(err);
      });

    } else {
    // update meta data

      File.findOneAndUpdate({fullPath: filepath}, {

        fullPath: filepath,
        type: mimeType,
        size: stat.size,

      }, (err, up) => {

        if (err) console.log(err);

      })
    }
  });
}

metaStorage.getMetaData = async function(filepath) {

  const file = await File.findOne({fullPath: filepath});

  return file

}


module.exports = metaStorage;
