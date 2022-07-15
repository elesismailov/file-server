
if (process.env.NODE_ENV === 'development') {
	require('dotenv').config()
}

const mongoose = require('mongoose');

function initializeMongo() {

	const uri = process.env.MONGO_URI;
	mongoose.connect(uri, {
		useNewUrlParser: true,
	});
	const db = mongoose.connection;
	db.on('open', () => console.log('Ready for interactions...'));
	db.on('err', (err) => console.log(err));

}

module.exports = initializeMongo;
