
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const getConfig = require('./getConfig');

// ? should you read a config everytime
const config = getConfig();
const log = console.log;


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

    log(chalk.blue('Started sending file. ') + req.path)

    req.on('end', () => {

      log(chalk.blue('Finished sending file. ') + req.path)

    })

  } else if (
    config.receive === true &&
    req.method === 'POST' &&
    req.path[0] === '/'
  ) {

    log(chalk.blue('Started receiving file: ') + req.path)

    req.on('end', async () => {

      log(chalk.blue('Finished receiving file: ') + req.path)

      const filesCount = await getFilesCount(config.dirname + dirpath)

      if (filesCount > config.fileNumberExeed) {

        // log(chalk.orange('The number of files has exeeded ') + config.fileNumberExeed)
        log('File has exeeded')
      }

    })
  }
}

async function getFilesCount(dirpath) {

  const files = await fs.promises.readdir(dirpath);

  return files.length
}


module.exports = logger;
