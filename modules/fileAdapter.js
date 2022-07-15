
function Adapter(filepath) {

}

Adapter.prototype.getFile = function(filename) {
  // returns a file stream   
}

Adapter.prototype.createFile = function(filename, stream) {
  // creates file
}

Adapter.prototype.ls = function() {
  // returns a str list of all files
}

export default Adapter;

