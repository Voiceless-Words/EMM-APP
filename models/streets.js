var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var streetsSchema = new Schema({
	str_id : {type : Number},
	str_name : {type : String},
	"town/0" : {type : String},
	"town/1" : {type : String},
	"town/2" : {type : String},
	"town/3" : {type : String},
	"town/4" : {type : String},
	"town/5" : {type : String}
});

module.exports = mongoose.model('assets', streetsSchema);