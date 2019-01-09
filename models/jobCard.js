var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var jobSchema = new Schema({
    jobCardNumber: { type: Number},
    permitNumber: { type: Number},
    assetName: { type: String},
    activity: { type: String},
    status: { type: String, default: '0' },
    employee_id: [{type: String, default: null }],
    requiredBy :{ type : Date },
    created_by: { type: String, required: true },
    time : { type : Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);