var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var formSchema = new Schema({
    jobnumber: { type: Number, required: true },
    conditionA: { type: String, required: true },
    conditionB: { type: String, required: true },
    cables: { type: Number, default: 0 },
    time : { type : Date, default: Date.now }
});

module.exports = mongoose.model('Forms', formSchema);
