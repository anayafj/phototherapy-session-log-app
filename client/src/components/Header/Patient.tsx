import styles from '../../styles/components/Patient.module.scss';
import React, { Fragment , useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames  from 'classnames';

import { useAppDispatch, useAppSelector} from '../../hooks';
import { fetchPatient } from '../../actions';
import NewPatient from './NewPatient';

interface NavProps {
    PatientContainer: boolean | null,
}

// interface NewPatient {
//     name: {
//         first: string,
//         last: string,
//     },
// }

// const initialState: NewPatient = {
//     name: {
//         first: "",
//         last: "",
//     },
// };

// THINGS TO DO ****************************
    // 1. CHECK IF PATIENTS ARE AVAILABLE for specific doctor
    // 2. IF PATIENT AVAILABLE, CHECK FOR LAST PATIENT USED FOR CURRENT USER
    // 3. GET NEW PATIENT BUTTON WORKING TO CREATE NEW PATIENT

const Patient: React.FC <NavProps>= ({ PatientContainer }) => {
    
    // Redux Hooks --------------------------------------
    const patient = useAppSelector(state => state.therapy['patient']);
	const dispatch = useAppDispatch();
    
    // States
    const [doctorStatus, setDoctorStatus] = useState<boolean | null>(null);
    const [showNewPatientForm, setShowNewPatientForm] = useState<boolean>(false); //##** ------- Set Start State ------------!!!!!!
    // const [newPatient, setNewPatient] = useState<NewPatient>(initialState);
    
    let patientName: string = patient.name ? patient.name.first+" "+patient.name.last : "";
    let multiPatients: boolean = true;

    console.log(" patient = ", patient);

    // Hooks ------------------------------>>
    useEffect(() => {
        setDoctorStatus(PatientContainer);
    }, [PatientContainer]);

    useEffect(() => {
        if(doctorStatus === true) dispatch(fetchPatient());
	}, [doctorStatus, dispatch]);


    // console.log("doctorStatus = ", doctorStatus);
    // console.log("patient = ", patient);
    // if(doctorStatus === true){
        // console.log("patient = ", patient);
        // console.log("newPatient.name.first = ", newPatient.name.first);

    // }
    

    // const changePatient = () => {
    //     console.log("Change patient");
    // }

    const handleNewPatientButton = (e: MouseEvent | React.MouseEvent) => {
        console.log("ADD New patient BTN HIT!!!");
        e.preventDefault();
        setShowNewPatientForm(true);
    }

    const cancelNewPatient = () => {
        console.log("cancelNewPatient callback");
        setShowNewPatientForm(false);
    }

    // Styles ------------------------------>
    let addPatientButton: string = classnames (
        styles.addPatientBtn, 'ui basic button mini', `${ showNewPatientForm ? 'hide': '' }`,
    );  
        
    let changePatientButton: string = classnames (
        'circular ui icon basic button mini', styles.changePatientBtn
    );

    // Render helper --------------------
    const renderPatientBar = () => {
        if(doctorStatus){
            return (
                <div className={ styles.patientBar }>
                    <h2 className={`${patient.name ? '' : 'hide'}`}>{ patientName }</h2>
                    <Link
                        to='/patient/change'
                        className={`${ multiPatients ? changePatientButton: 'hide' }`}
                    >
                        <i className="users icon"></i>
                    </Link>
                    <Link
                        to='/patient/create-new'
                        className={ addPatientButton }
                        onClick={(e) => handleNewPatientButton(e)}
                    >
                        <i className="icon user"></i>
                        New Patient
                    </Link>
                    {/* {addNewPatientForm()} */}
                    <div className={`${ showNewPatientForm ? '': 'hide' }`}>
                        <NewPatient cancelNewPatient={ cancelNewPatient }/>
                    </div>
                </div>	
            );
        } else {
            return <div className={ styles.defaultBar }></div>;
        } 
    }

    return (
        <Fragment>
            { renderPatientBar() }
        </Fragment>
    );
}

export default Patient;