const mongoose = require('mongoose');
const { Schema } = mongoose;

const patientSchema = new Schema({
	userGoogleId: String,
	created: { type: Date, default: Date.now },
	patientName: {
		first: String,
		last: String,
	},
});

mongoose.model('patients', patientSchema);
