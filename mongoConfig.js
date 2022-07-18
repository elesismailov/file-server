
if (process.env.NODE_ENV === 'development') {
	require('dotenv').config()
}

const mongoose = require('mongoose');

async function initializeMongo() {

  const uri = process.env.MONGO_URI;
  const connection = await mongoose.connect(uri, {
          useNewUrlParser: true,
  });

  if (connection) {

    console.log('Connection established.')
    
    return connection
  }

}

module.exports = initializeMongo;
