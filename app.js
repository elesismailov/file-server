
const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

const fileStorage = require('./modules/fileStorage');
const metaStorage = require('./modules/metaStorage');
// TODO try catch no internet connection
// const initializeMongo = require('./mongoConfig');

const logger = require('./modules/logger/index');

const infoHandler = require('./routes/info');
const getHandler = require('./routes/get');
const postHandler = require('./routes/info');

try {

  initializeMongo()

} catch (err) {

  console.log('No internet connection.')

}

app.use(logger);

app.get('/info/*', infoHandler);
app.get('/*', getHandler);
app.post('/*', postHandler);


const port = 5000;

app.listen(port, () => {
  console.log('App is listening...')
});
