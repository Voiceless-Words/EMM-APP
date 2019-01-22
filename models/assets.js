var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var assetsSchema = new Schema({
    name: { type: String, required: true },
    value: { type: String, required: true }
});

module.exports = mongoose.model('Assets', assetsSchema);
