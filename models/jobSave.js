var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var jobSchema = new Schema({
    jobCardNumber: { type: Number, required: true },
    assetName: { type: String, required: true },
    activity: { type: String, required: true },
    status: { type: String, required: true, default: '0' },
    employee_id:[{ type: String, required: true, default: null }],
    time : { type : Date, default: Date.now }
});

module.exports = mongoose.model('JobSave', jobSchema);
