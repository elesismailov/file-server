
require('dotenv').config()

const initializeMongo = require('../mongoConfig');

const metaStorage = require('../modules/metaStorage.js');

beforeAll(() => {

  return initializeMongo()

})

describe('Test getMetaData', () => {

  test('returns null', async () => {

    const meta = await metaStorage.getMetaData('./data/');

    expect(meta).toBeNull();
    
  });

});
