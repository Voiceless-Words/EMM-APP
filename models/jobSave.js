var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var jobSchema = new Schema({

	jobCardNumber: { type: String},
    permitNumber : { type: String},
    assetType: { type: String},
    assetsMaterial: { type: String},
    jobActivity : { type: String},
    jobLocation : { type: String},
    created_by: { type: String},
    gps_lati : { type: String},
    gps_long : { type: String},
    time : { type : Date, default: Date.now }

/*
    jobCardNumber: { type: Number, required: true },
    assetName: { type: String, required: true },
    activity: { type: String, required: true },
    status: { type: String, required: true, default: '0' },
    requiredBy :{ type : Date },
    created_by: { type: String, required: true },
    employee_id:[{ type: String, required: true, default: null }],
    time : { type : Date, default: Date.now } */
});

module.exports = mongoose.model('JobSave', jobSchema);
