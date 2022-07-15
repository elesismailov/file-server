
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
        type: mime.lookup(filepath),
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

      File.findByIdAndUpdate({id: resFile.id}, {
        name: filename, 
        dir: parsed.dir,
        fullPath: filepath,
        type: mime.lookup(filepath),
        size: stat.size,
        cDate: stat.birthtime,
        mDate: stat.mtime,
      })

    }


  });


}

metaStorage.getMetaData = function(filepath) {


}


module.exports = metaStorage;
