const express = require('express');
const Patient = require('../models/Patient');
// const PatientList = require('../models/PatientList');
const router = express.Router();

router.get('/patient', async (req, res) => {
	const patient = await Patient.find();
	console.log('patient routes - after await  -  patients= ', patient);
	res.send(patient);
});

// router.get('/patient/list', async (req, res) => {
// 	const patientList = await PatientList.find();
// 	console.log('patient routes - after await  -  patients= ', patient);
// 	res.send(patient);
// });

// router.post('/patients', async (req, res) => {
// 	const newPatient = req.body;
// 	console.log('Post new patient = ', newPatient);
// 	// res.send(patients);
// });

module.exports = router;
