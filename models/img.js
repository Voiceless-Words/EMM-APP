var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imgSchema = new Schema({
  jobnumber: {type: String},
  type: {type:String},
  img:{type: String}
});

module.exports = mongoose.model('Image', imgSchema);
