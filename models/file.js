
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({

  name: {type: String, required: true},
  dir: {type: String, required: true},
  size: {type: BigInt, required: true},
  type: {type: String, required: true},
  creationDate: {type: Date, required: true},
  modDate: {type: Date, required: true},

});


module.exports = mongoose.model('File', FileSchema);
