var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var assetsSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    east: { type: Number, default: 0 },
    south: { type: Number, default: 0 },
    time : { type : Date, default: Date.now }
});

module.exports = mongoose.model('Assets', assetsSchema);