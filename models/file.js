
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({

  name: {type: String, required: true},
  dir: {type: String, required: true},
  fullPath: {type: String, required: true, unique: true},
  size: {type: Number, required: true},
  type: {type: String, required: true},
  cDate: {type: Date, required: true},
  mDate: {type: Date, required: true},

});


module.exports = mongoose.model('File', FileSchema);
