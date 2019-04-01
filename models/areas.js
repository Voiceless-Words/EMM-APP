var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var testSchema = new Schema({
    name: { type: String, required: true },
    
},
{collection : 'areas'});

module.exports = mongoose.model('Areas', testSchema, 'areas');
