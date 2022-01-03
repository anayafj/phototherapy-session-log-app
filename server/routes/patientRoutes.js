const express = require('express');
const Patients = require('../models/Patients');
const router = express.Router();

router.get('/patients', async (req, res) => {
	console.log('patient routes - req = ', req);
	const patients = await Patients.find();
	res.send(patients);
});

// router.post('/patients', async (req, res) => {
// 	const newPatient = req.body;
// 	console.log('Post new patient = ', newPatient);
// 	// res.send(patients);
// });

module.exports = router;
