var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var jobSchema = new Schema({
    jobCardNumber: { type: String},
    permitNumber: { type: String},
    jobAssetsType: { type: String},
    assetsMaterial: { type: String},
    jobLocation: { type: String},
    company: { type: String},
    jobActivity: { type: String},
    asset_lati: { type: String},
    asset_long: { type: String},
    status: { type: String, default: '0' },
    jobCreatedBy: { type: String, required: true },
    time : { type : Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);