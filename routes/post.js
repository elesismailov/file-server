
const path = require('path');

const fileStorage = require('../modules/fileStorage');
const metaStorage = require('../modules/metaStorage');

const config = require('../config');

function postHandler(req, res) {

  const adapter = fileStorage.createAdapter(config.dirname + req.path);

  console.log(config.dirname + req.path)

  const parse = path.parse(req.path);

  const filename = parse.name + parse.ext;

  const fileWriteStream = adapter.createFile(filename);

  req
    .on('data', data => {
      
      fileWriteStream.write(data)
      // req.pipe(fileWriteStream)

    })
    .on('error', () => {

      res.status(505)

    })
    .on('end', () => {

      fileWriteStream.end()

      metaStorage.createMetaData(
        path.join(config.dirname, req.path),
        {
          type: req.get('Content-Type')
        }
      );

      res.end()

    })
}


module.exports = postHandler;
