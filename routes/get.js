
const path = require('path');
const fs = require('fs');

const fileStorage = require('../modules/fileStorage');
const metaStorage = require('../modules/metaStorage');

const config = require('../config');


async function getHandler(req, res) {

  // an empty request
  if (req.path == '/') {
    
    res.end()

    return 
  }

  const filepath = path.join(config.dirname + req.path);

  if (!fs.existsSync(filepath)) {

    res.sendStatus(404)

    return

  }

  const parsed = path.parse(req.path);

  const filename = parsed.name + parsed.ext;

  const meta = await metaStorage.getMetaData(filepath);

  if (meta) {

    // TODO some mime types are wrong
    res.append('Content-Type', meta.type)

    // the user set content-length messes up response
    meta.size ? res.append('Content-Length', meta.size-1): 0;
    
  }

  // get directory adapter
  const adapter = fileStorage.createAdapter(filepath);

  // requested file stream
  const readStream = adapter.getFile(filename);
  
  readStream
    .on('open', () => {
      
      readStream.pipe(res)

    })

    .on('error', () => {
      
      res
        .sendStatus(404)
        .end();
      
    })
  
    .on('end', () => {
      
      res.end()

    });
}

module.exports = getHandler;
