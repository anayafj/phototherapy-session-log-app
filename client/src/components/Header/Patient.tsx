import styles from '../../styles/components/Patient.module.scss';
import React, { Fragment , useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames  from 'classnames';

import { PatientState } from '../../actions/types';
import { useAppDispatch, useAppSelector} from '../../hooks';
import { fetchPatient } from '../../actions';
import NewPatient from './NewPatient';
// import { forEach } from 'lodash';

interface NavProps {
    // PatientContainer: boolean | null,
    PatientContainer: string,
}

interface Doctor {
        id: string,
        status: boolean,
}

interface CurrentPatient {
        // id: string,
        data: PatientState | undefined,
}

const DoctorInitialState: Doctor = {
    id: "",
    status: false,
}

const CurrentPatientInitialState: CurrentPatient = {
    // id: "",
    data: undefined,
}

// THINGS TO DO ****************************
    // Ability to change patients

const Patient: React.FC <NavProps>= ({ PatientContainer }) => {
    
    // Redux Hooks ------------------------------------------------------------------>>
    const patient: [PatientState] = useAppSelector(state => state.therapy['patient']);
	const dispatch = useAppDispatch();    
    
    // States ----------------------------------------------------------------------->>

    // state for current user/doctor and status
    const [doctor, setDoctor] = useState<Doctor>(DoctorInitialState);
    // state with current patient info
    const [currentPatient, setCurrentPatient] = useState<CurrentPatient>(CurrentPatientInitialState);
    // state to show/hide 'New Patient' button
    const [showNewPatientForm, setShowNewPatientForm] = useState<boolean>(false); //##**Set Start State 

    // Hooks -------------------------------------------------------------------->>

    // Set Doctor 
    useEffect(() => {
        setDoctor({id: PatientContainer, status: PatientContainer ? true : false});
    }, [PatientContainer]);

    // Gets patients
    useEffect(() => {
        if(doctor.status === true) dispatch(fetchPatient());
	}, [doctor.status, dispatch]);

    // Set current patient
    useEffect(() => {
        if(patient.length > 0){
            setCurrentPatient({ data: patient.find( x => x._id === latestPatient())});
            // setCurrentPatient({ id: latestPatient() });
        }
    }, [patient]);

     
    



    
    const handleChangePatientButton = (e: MouseEvent | React.MouseEvent) => {
        console.log("Change patient");
        e.preventDefault();
    }

    const handleNewPatientButton = (e: MouseEvent | React.MouseEvent) => {
        // console.log("ADD New patient BTN HIT!!!");
        e.preventDefault();
        setShowNewPatientForm(true);
    }

    const cancelNewPatient = () => {
        // console.log("cancelNewPatient callback");
        setShowNewPatientForm(false);
    }

    // Helper functions ----------------------------------------------------------------------->>

    // Get Current patient info
    const getPatientInformation = (info:string) => {

        switch(info){
            case 'name':
                if(currentPatient.data === undefined) return "";
                const firstName = currentPatient.data.name?.first;
                const lastName = currentPatient.data.name?.last;
                return firstName+" "+lastName;
            default:
                return;
        }
    } 

    // Get most recent patient by current doctor and time
    const latestPatient = ():string => {
            const patientMap: Map<string, Date> = new Map();
    
            patient.forEach((patient:PatientState) => {
                if(patient.updated?.user.includes(doctor.id)){
                    patientMap.set(patient._id, patient.updated.date)
                }
            });
    
            if(patientMap.size > 1){
                // console.log("Multiple Patients - filter by latest date");
                const now: number = new Date().getTime();
                let latestPatient = { id: '', time: 0 };
    
                for (const [key, value] of patientMap.entries()) {
                    let tempTimestamp: number = new Date(value).getTime();
                    let timeDiff: number = now - tempTimestamp;
    
                     if(latestPatient.id === ''){ latestPatient.id = key; latestPatient.time = timeDiff;
                     } else {
                         if( timeDiff < latestPatient.time ){ latestPatient.id = key; latestPatient.time = timeDiff; }
                     }
                }
                return latestPatient.id;
            }
    
        return patientMap.keys().next().value;        
    }

    // Styles ----------------------------------------------------------------------->>
    let addPatientButton: string = classnames (
        styles.addPatientBtn, 'ui basic button mini', `${ showNewPatientForm ? 'hide': '' }`,
    );  
        
    let changePatientButton: string = classnames (
        'circular ui icon basic button mini', styles.changePatientBtn
    );

    // Render helper --------------------
    const renderPatientBar = () => {
        if(doctor.status){
            return (
                <div className={ styles.patientBar }>
                    <h2 className={`${currentPatient.data ? '' : 'hide'}`}>{ getPatientInformation('name') }</h2>
                    <Link
                        to='/patient/change'
                        className={`${ patient.length > 1 ? changePatientButton : 'hide' }`}
                        onClick={(e) => handleChangePatientButton(e)}
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