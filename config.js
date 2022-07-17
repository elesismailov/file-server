
const path = require('path');


const loggerConfig = {

  // get the dirname of this file itself
  dirname: __dirname,

  // enable to log sending files to the client
  send: true,

  // enable to log reveiving files from the client
  receive: true,

  // WARN if the number of files in a directory exeeds this number
  // number || null
  fileNumberExeed: 3,

  // WARN if the size of the files in a dir
  // exeeds this number in KB
  // number || null
  dirSize: 10,

}

module.exports = loggerConfig;
