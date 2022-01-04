import styles from '../../styles/components/Patient.module.scss';
import { Fragment , useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames  from 'classnames';

import { useAppDispatch, useAppSelector} from '../../hooks';
import { fetchPatient } from '../../actions';

interface NavProps {
    PatientContainer: boolean | null,
}

// THINGS TO DO ****************************
    // 1. CHECK IF PATIENTS ARE AVAILABLE for specific doctor
    // 2. IF PATIENT AVAILABLE, CHECK FOR LAST PATIENT USED FOR CURRENT USER
    // 3. GET NEW PATIENT BUTTON WORKING TO CREATE NEW PATIENT

const Patient: React.FC <NavProps>= ({ PatientContainer }) => {
    let patientName: string = "Elise Anaya";
    let multiPatients: boolean = true;

    // Redux Hooks --------------------------------------
    const patient = useAppSelector(state => state.therapy['patient']);
	const dispatch = useAppDispatch();

    // States
    const [doctorStatus, setDoctorStatus] = useState<boolean | null>(null);   

    // console.log(" patient = ", patient);

    useEffect(() => {
        setDoctorStatus(PatientContainer);
    }, [PatientContainer])

    // useEffect(() => {
    //     if(doctorStatus){
    //         dispatch(fetchPatient());
    //     } 
    // }, [dispatch, doctorStatus]);

    useEffect(() => {
    if(doctorStatus === true) dispatch(fetchPatient());
	}, [doctorStatus, dispatch]);

    console.log("doctorStatus = ", doctorStatus);
    // console.log("patient = ", patient);
    if(doctorStatus === true){
        console.log("patient = ", patient);
        
        // console.log("doctorStatus googleId = ", doctorStatus.googleId);

    }
    

    // const changePatient = () => {
    //     console.log("Change patient");
    // }

    // const newPatient = () => {
    //     console.log("New patient");
    // }

    

    // Styles ------------------------------>
    let addPatientButton: string = classnames (
        styles.addPatientBtn, 'ui basic button mini'
    );  
        
    let changePatientButton: string = classnames (
        'circular ui icon basic button mini', styles.changePatientBtn
    );

    // Render helper --------------------
    const renderPatientBar = () => {
        if(doctorStatus){
            return (
                <div className={styles.patientBar}>
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
            );
        } else {
            return <div className={styles.defaultBar}></div>;
        } 
    }

    return (
        <Fragment>
            {renderPatientBar()}
        </Fragment>
    );
}

export default Patient;