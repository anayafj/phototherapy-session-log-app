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

// THINGS TO DO ****************************
    // 2. IF PATIENT AVAILABLE, CHECK FOR LAST PATIENT USED FOR CURRENT USER

const Patient: React.FC <NavProps>= ({ PatientContainer }) => {
    
    // Redux Hooks --------------------------------------
    const patient = useAppSelector(state => state.therapy['patient']);
	const dispatch = useAppDispatch();
    
    // States
    const [doctorStatus, setDoctorStatus] = useState<boolean | null>(null);
    const [showNewPatientForm, setShowNewPatientForm] = useState<boolean>(false); //##** ------- Set Start State ------------!!!!!!
    
    let patientName: string = patient.name ? patient.name.first+" "+patient.name.last : "";

    // Hooks ------------------------------>>
    useEffect(() => {
        setDoctorStatus(PatientContainer);
    }, [PatientContainer]);

    useEffect(() => {
        if(doctorStatus === true) dispatch(fetchPatient());
	}, [doctorStatus, dispatch]);
    
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
                        className={`${ patient.length > 1 ? changePatientButton : 'hide' }`}
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