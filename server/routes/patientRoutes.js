const express = require('express');
const Patient = require('../models/Patient');
// const PatientList = require('../models/PatientList');
const router = express.Router();

router.get('/patient', async (req, res) => {
	// console.log('patient routes - get patients');
	const patient = await Patient.find();
	// console.log('patient routes - after await  -  patients = ', patient);
	res.send(patient);
});

// router.get('/patient/list', async (req, res) => {
// 	const patientList = await PatientList.find();
// 	console.log('patient routes - after await  -  patients= ', patient);
// 	res.send(patient);
// });

router.post('/patient', async (req, res) => {
	const { name } = req.body;
	const { _id } = req.user;

	let newPatientObj = {
		name,
		updated: { date: Date.now(), user: _id },
		users: [_id],
	};

	const addNewPatient = new Patient(newPatientObj);
	await addNewPatient.save();
	res.send(addNewPatient);
});

module.exports = router;
