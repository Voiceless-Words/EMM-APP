var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var jobSchema = new Schema({
    jobCardNumber: { type: Number, required: true },
    permitNumber: { type: Number, required: true },
    assetName: { type: String, required: true },
    activity: { type: String, required: true },
    time : { type : Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);