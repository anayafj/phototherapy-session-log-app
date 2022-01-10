const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = require('./Users');

const patientSchema = new Schema({
	name: {
		first: String,
		last: String,
	},
	created: { type: Date, default: Date.now },
	updated: { date: Date, user: mongoose.ObjectId },
	users: [mongoose.ObjectId],
});

const Patient = mongoose.model('patient', patientSchema);
module.exports = Patient;
