
require('dotenv').config()


const metaStorage = require('../modules/metaStorage.js');

let path;

beforeAll(() => {

  path = require('path');
  const initializeMongo = require('../mongoConfig');

  return initializeMongo()

})

describe('Test getMetaData', () => {

  test('returns null', async () => {

    const meta = await metaStorage.getMetaData('./data/');

    expect(meta).toBeNull();
    
  });


  test('get meta data', async () => {

    metaStorage.createMetaData(path.join(__dirname, '/data/test1.txt'))

    const meta = await metaStorage.getMetaData(path.join(__dirname, '/data/test1.txt'));

    expect(meta).not.toBeNull();
    expect(meta).toHaveProperty('dir');



  });

});
