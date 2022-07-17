

function logger(req, res, next) {

  next();

  /* TODO

    - info: if number of files exceeds <settings.fileExeed>
    - log: started sending file if <settings.upload>
    - log: started recieving file if <settings.download>
    - warn: size of files in <certain> dir exeeded if <settings.size> != null

  */

}


module.exports = logger;
