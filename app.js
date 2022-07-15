
const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

const fileStorage = require('./modules/fileStorage');
const metaStorage = require('./modules/metaStorage');
const initializeMongo = require('./mongoConfig');

initializeMongo()


app.get('/info/*', async (req, res) => {

  const parsed = path.parse(req.path);

  const filepath = req.path.slice(5);
  
  const meta = await metaStorage.getMetaData(path.join(__dirname, filepath));

  console.log(meta)

  res.json(meta)

});


// GET File
app.get('/*', async (req, res) => {

  if (req.path == '/') {
    
    res.end()
    return 
  }

  const filepath = path.join(__dirname + req.path);

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

  const parse = path.parse(req.path);

  const filename = parse.name + parse.ext;

  // requested file stream
  const readStream = adapter.getFile(filename);

  readStream
    .on('open', () => {
      
      readStream.pipe(res)

    })

    .on('err', () => {
      // TODO handle error
    })
  
    .on('end', () => {
      
      res.end()

    })

});

// UPLOAD FILE
app.post('/*', (req, res, next) => {

  const adapter = fileStorage.createAdapter(__dirname + req.path);

  const parse = path.parse(req.path);

  const filename = parse.name + parse.ext;

  const fileWriteStream = adapter.createFile(filename);

  req
    .on('data', data => {
      
      fileWriteStream.write(data)

    })
    .on('error', () => {
      // TODO handle error
    })
    .on('end', () => {

      fileWriteStream.end()

      console.log(req.get('Content-Type'))

      metaStorage.createMetaData(path.join(__dirname, req.path), {
        type: req.get('Content-Type'),
      });

      res.end()

    })

});


const port = 5000;


app.listen(port, () => {
  console.log('App is listening...')
});
