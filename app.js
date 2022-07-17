
const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

const fileStorage = require('./modules/fileStorage');
const metaStorage = require('./modules/metaStorage');
const initializeMongo = require('./mongoConfig');

const logger = require('./modules/logger/index');

initializeMongo()

app.use(logger);

app.get('/info/*', async (req, res) => {

  const parsed = path.parse(req.path);

  const filepath = req.path.slice(5);
  
  const meta = await metaStorage.getMetaData(path.join(__dirname, filepath));

  console.log(meta)

  res.json(meta)

});


// GET File
app.get('/*', async (req, res) => {

  // an empty request
  if (req.path == '/') {
    
    res.end()

    return 
  }

  const filepath = path.join(__dirname + req.path);

  if (!fs.existsSync(filepath)) {

    res.sendStatus(404)

    return

  }

  const parsed = path.parse(req.path);

  const filename = parsed.name + parsed.ext;

  // TODO handle null meta data
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

});

// UPLOAD FILE
app.post('/*', (req, res) => {

  const adapter = fileStorage.createAdapter(__dirname + req.path);

  const parse = path.parse(req.path);

  const filename = parse.name + parse.ext;

  const fileWriteStream = adapter.createFile(filename);

  req
    .on('data', data => {
      
      fileWriteStream.write(data)

    })
    .on('error', () => {

      res.status(505)

    })
    .on('end', () => {

      fileWriteStream.end()

      metaStorage.createMetaData(
        path.join(__dirname, req.path),
        {
          type: req.get('Content-Type')
        }
      );

      res.end()

    })

});


const port = 5000;


app.listen(port, () => {
  console.log('App is listening...')
});
