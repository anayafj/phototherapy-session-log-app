const mongoose = require('mongoose');
const { Schema } = mongoose;
const Patient = require('./Patient');

const patientListSchema = new Schema({
	patientList: Patient,
});

const PatientList = mongoose.model('patientList', patientListSchema);
module.exports = PatientList;
