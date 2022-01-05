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
    // const [newPatient, setNewPatient] = useState<NewPatient>(initialState);
    
    let patientName: string = patient.name ? patient.name.first+" "+patient.name.last : "";
    let multiPatients: boolean = true;

    // console.log(" patient = ", patient);

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
    }

    // const handleSubmit = (e: MouseEvent | React.FormEvent) => {
    //     console.log("handleSubmit -- newPatient = ",newPatient);
    //     e.preventDefault();
    // }

    // const handleChangeFirstName = (value: string) => {
    //     console.log("handleChangeFirstName -- value = ",value);

    //     setNewPatient({...newPatient, name:{first: value, last: newPatient.name.last}});
    //     console.log("handleChangeFirstName -- newPatient = ",newPatient);
    // }

    // const handleChangeLastName = (value: string) => {
    //     console.log("handleChangeLastName -- value = ",value);

    //     setNewPatient({...newPatient, name:{first: newPatient.name.first, last: value}});
    //     console.log("handleChangeLastName -- newPatient = ",newPatient);
    // }

    

    // Styles ------------------------------>
    let addPatientButton: string = classnames (
        styles.addPatientBtn, 'ui basic button mini'
    );  
        
    let changePatientButton: string = classnames (
        'circular ui icon basic button mini', styles.changePatientBtn
    );

    // const addNewPatientForm = () => {
    //     return (
    //         <form onSubmit={(e) => handleSubmit(e)}>
    //     <label>
    //       First Name:
    //       <input type="text" value={newPatient.name.first} onChange={(e) => handleChangeFirstName(e.target.value)} />
    //     </label>
    //     <label>
    //       Last Name:
    //       <input type="text" value={newPatient.name.last} onChange={(e) => handleChangeLastName(e.target.value)} />
    //     </label>
    //     <input type="submit" value="Submit" />
    //   </form>
    //     );
    // }

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
                        onClick={(e) => handleNewPatientButton(e)}
                    >
                        <i className="icon user"></i>
                        New Patient
                    </Link>
                    {/* {addNewPatientForm()} */}
                    <NewPatient />
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