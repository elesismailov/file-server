
const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

const fileStorage = require('./modules/fileStorage');


app.get('/*', (req, res, next) => {

  const adapter = fileStorage.createAdapter(__dirname + req.path);

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



app.get('/get', (req, res) => {
  
  const filepath = path.join(__dirname, 'download.txt');

  const readStream = fs.createReadStream(filepath);

  readStream
  .on('open', () => {
    readStream.pipe(res)
  })
  .on('end', () => {
    console.log('ended')
  })

});

app.post('/upload', (req, res) => {

  req
    .on('data', data => {

      console.log(data);

    })
    .on('close', data => {

      console.log('CLOSED STREAM');

      res.end()

    })

});

const port = 5000;


app.listen(port, () => {
  console.log('ready')
});
