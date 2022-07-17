
const getConfig = require('./getConfig');

// ? should you read a config everytime
const config = getConfig();


function logger(req, res, next) {

  next();

  if (
    config.send === true &&
    req.method === 'GET' &&
    req.path[0] === '/' 
  ) {

    // TODO color the output
    console.info('INFO: Started sending file. ' + req.path)

    req.on('end', () => {

      console.log('INFO: Finished sending file. ' + req.path)

    })

  }
  

  /* TODO

    - info: if number of files exceeds <settings.fileExeed>

    - log: started sending file if <settings.upload>
    - log: finished sending file if <settings.upload>

    - log: started recieving file if <settings.download>
    - log: finished recieving file if <settings.download>

    - warn: size of files in <certain> dir exeeded if <settings.size> != null

  */

}


module.exports = logger;
