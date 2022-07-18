
require('dotenv').config()


const metaStorage = require('../modules/metaStorage.js');

let path;
let fs;

beforeAll(() => {

  path = require('path');
  fs = require('fs');

  const initializeMongo = require('../mongoConfig');

  return initializeMongo()

})

describe('Test getMetaData', () => {

  test('returns null', async () => {

    const meta = await metaStorage.getMetaData('./data/');

    expect(meta).toBeNull();
    
  });


  test('get meta data', async () => {

    const fullpath = path.join(__dirname, '/data/test.txt');

    // create file
    const file = await fs.writeFile(fullpath, 'hello test file', (err) => {});

    metaStorage.createMetaData(fullpath);

    const meta = await metaStorage.getMetaData(path.join(__dirname, '/data/test1.txt'));

    expect(meta).not.toBeNull();
    expect(meta).toHaveProperty('dir');

    // remove file
    await metaStorage.deleteMetaData(fullpath);
    await fs.rm(fullpath, (err) => {})

  });

});
