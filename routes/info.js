
const path = require('path');

const metaStorage = require('../modules/metaStorage');

const config = require('../config');

async function infoHandler(req, res) {

  const parsed = path.parse(req.path);

  const filepath = req.path.slice(5);
  
  const meta = await metaStorage.getMetaData(path.join(config.dirname, filepath));

  res.json(meta)

}


module.exports = infoHandler;
