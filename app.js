
const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

const fileStorage = require('./modules/fileStorage');
const metaStorage = require('./modules/metaStorage');

const logger = require('./modules/logger/index');

const infoHandler = require('./routes/info');
const getHandler = require('./routes/get');
const postHandler = require('./routes/info');

// mongo connection
try {

  const initializeMongo = require('./mongoConfig');

  initializeMongo()

} catch (err) {

  const initializeMongo = require('./mongoConfig');

  initializeMongo()

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
