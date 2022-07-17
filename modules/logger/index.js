const fs = require('fs');
const path = require('path');

const getConfig = require('./getConfig');

// ? should you read a config everytime
const config = getConfig();


function logger(req, res, next) {

  next();

  const parsed = path.parse(req.path);

  const dirpath = parsed.dir;

  const filename = parsed.name + parsed.ext;

  if (
    config.send === true &&
    req.method === 'GET' &&
    req.path[0] === '/' 
  ) {

    // TODO color the output
    console.info('INFO: Started sending file. ' + req.path)

    req.on('end', async () => {

      console.log('INFO: Finished sending file. ' + req.path)

      const filesCount = await getFilesCount(config.dirname + dirpath)

      if (filesCount > config.fileNumberExeed) {

        console.warn('WARN: The number of files has exeeded ' + config.fileNumberExeed)
      }

    })

  } else if (
    config.receive === true &&
    req.method === 'POST' &&
    req.path[0] === '/'
  ) {

    console.log('INFO: Started receiving file: ' + req.path)

    req.on('end', () => {

      console.log('INFO: Finished receiving file: ' + req.path)

    })
  }
}

async function getFilesCount(dirpath) {

  const files = await fs.promises.readdir(dirpath);

  console.log(files)

  return files.length
}


module.exports = logger;
