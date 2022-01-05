const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = require('./Users');

const patientSchema = new Schema({
	name: {
		first: String,
		last: String,
	},
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now, user: Number },
	users: User,
});

const Patient = mongoose.model('patient', patientSchema);
module.exports = Patient;
