import styles from '../../styles/components/Patient.module.scss';
import { Fragment , useEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames  from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPatient } from '../../actions';

interface NavProps {
    PatientContainer: boolean | null,
}

const Patient: React.FC <NavProps>= ({ PatientContainer }) => {
    // Redux Hooks --------------------------------------
    const patient = useAppSelector(state => state.therapy['patient']);
	const dispatch = useAppDispatch();

    console.log(" patient = ", patient);

    useEffect(() => {
        if(PatientContainer) dispatch(fetchPatient());
    }, [dispatch, PatientContainer])

    console.log("PatientContainer = ", PatientContainer);

    let patientName: string = "Elise Anaya";
    let multiPatients: boolean = true;

    const changePatient = () => {
        console.log("Change patient");
    }

    const newPatient = () => {
        console.log("New patient");
    }

    // Styles ------------------------------>
    let patientContainerBar: string = classnames (
        styles.patientBar , `${PatientContainer ? '' : 'hide'}`
    );

    let addPatientButton: string = classnames (
        styles.addPatientBtn, 'ui basic button mini'
    );  
        
    let changePatientButton: string = classnames (
        'circular ui icon basic button mini', styles.changePatientBtn
    );

    // reloadDocument

    return (
        <Fragment>
            <div className={`${PatientContainer ? 'hide' : styles.defaultBar}`}></div>
            <div className={patientContainerBar}>
                <h2>{patientName}</h2>
                    <Link
                        to='/patient/change'
                        className={`${multiPatients ? changePatientButton: 'hide'}`}
                    >
                        <i className="users icon"></i>
                    </Link>
                    <Link
                        to='/patient/create-new'
                        className={addPatientButton}
                    >
                        <i className="icon user"></i>
                        New Patient
                    </Link>
            </div>	
        </Fragment>
    );
}

export default Patient;