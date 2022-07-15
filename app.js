const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

const fileStorage = require('./modules/fileStorage');


app.get('/', (req, res) => {

  fileStorage.createAdapter()

  res.send('hello world!')

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
