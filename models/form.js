var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var formSchema = new Schema({
    jobnumber: { type: String, required: true },
    conditionA: [{
      boxDamage: {type: String},
      boxDoor: {type: String},
      plinthCondition: {type: String},
      plinthVisible: {type: String},
      plinthDefect: {type: String}
    }],
    conditionB: [{
      electronic: {type: String},
      electSecure: {type: String},
      electDoor: {type: String},
      electTransponder: {type:  String},
      electDoorBypassed: {type: String},
      battery: {type: String},
      working: {type: String},
      remote: {type: String}}],
    cables: [{
      name:{type:String},
      correct: {type: String},
      tag: {type: String},
      label: {type: String},
      breakerCondition: {type: String},
      fitted: {type: String},
      size: {type: String},
      meter: {type: String},
      meterSeals: {type: String},
      meterSealsColour: {type: String},
      meterBypassed: {type: String},
      standConnected: {type: String}
 }],
    images: [],
    reviewStatus: {type: Number},
    completedby:{type: String},
    time : { type : Date, default: Date.now }
});

module.exports = mongoose.model('Forms', formSchema);
