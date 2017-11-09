var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = new Schema({
    patientname: {type: String,  required: true},
    age: {type: String, required: true},
    gender: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    doctor_id: {type: String, required: true},
    create_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);