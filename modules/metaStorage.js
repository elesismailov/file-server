
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const File = require('../models/file');

const metaStorage = {};

metaStorage.createMetaData = function(filepath, options) {

  console.log('creating meta data')

  const parsed = path.parse(filepath);

  const filename = parsed.name + parsed.ext;

  const stat = fs.statSync(filepath);

  const mimeType = options ? options.type : mime.lookup(filepath);

  File.findOne({fullPath: filepath}, (err, resFile) => {
    if (err) {
      throw err
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
        if (err) {
          // console.log(err)
          throw err
        }
        console.log('created meta data')
      });

    } else {
    // update meta data

      File.findOneAndUpdate({fullPath: filepath}, {

        fullPath: filepath,
        type: mimeType,
        size: stat.size,

      }, (err, up) => {

        if (err) throw err

        console.log('updated')
      })
    }
  });
}

metaStorage.getMetaData = async function(filepath) {

  const file = await File.findOne({fullPath: filepath});

  console.log('getting meta data')

  // TODO error handling

  return file

}


module.exports = metaStorage;
