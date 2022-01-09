import styles from '../../styles/components/NewPatient.module.scss';
import classnames  from 'classnames';
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks';
import { addPatient } from '../../actions';

interface NewPatientProps {
    cancelNewPatient: any,
    // patientStatus: boolean,
}

interface AddNewPatient {
    name: {
        first: string,
        last: string,
    },
}

const initialState: AddNewPatient = {
    name: {
        first: "",
        last: "",
    },
};

interface PatientFormValidation {
    firstNameValid: boolean,
    lastNameValid: boolean,
    formValid: boolean,
    formError: boolean,
}

const formInitialState: PatientFormValidation = {
    firstNameValid: false,
    lastNameValid: false,
    formValid: false,
    formError: false,
}

const NewPatient: React.FC <NewPatientProps> = ({cancelNewPatient}) => {
    const errMsg: string = "Name should be 3 characters min.";

    const dispatch = useAppDispatch();

    const [newPatient, setNewPatient] = useState<AddNewPatient>(initialState);
    const [formValidation, setFormValidation] = useState<PatientFormValidation>(formInitialState);

    const checkForValidation = () => {
        console.log('checking for validation...');
        console.log('newPatient.name.first.length = ',newPatient.name.first.length);
        console.log('newPatient.name.last.length = ',newPatient.name.last.length);
        const validFirstName = newPatient.name.first.length > 2 ? true : false;
        const validLastName = newPatient.name.last.length > 2 ? true : false;

        if(validFirstName && validLastName){
            console.log('Form valid!');
            setFormValidation({...formValidation, formError: false, formValid: true, firstNameValid: validFirstName, lastNameValid: validLastName});
        } else {
            setFormValidation({...formValidation, formError: true, formValid: false, firstNameValid: validFirstName, lastNameValid: validLastName});
        }

    }

    // useEffect(() => {
    //     if(doctorStatus === true) dispatch(fetchPatient());
	// }, [doctorStatus, dispatch]);

    // On Valid Form send -------------------------------------
    const handleSubmit = (e: MouseEvent | React.FormEvent) => {
        console.log("handleSubmit -- newPatient = ",newPatient);
        e.preventDefault();
        console.log("Submit Name - newPatient = ",newPatient);
        dispatch(addPatient(newPatient));
    }

    // Cancel Form
    const cancelPatientButton = (e: MouseEvent | React.MouseEvent) => {
        console.log("cancelPatientButton");
        e.preventDefault();
        cancelNewPatient();
    }

    // On First Name field change -------------------------------------
    const handleChangeFirstName = (value: string) => {
        setNewPatient({...newPatient, name:{first: value, last: newPatient.name.last}});
        // checkForValidation();
    }

    // On Second Name field change -------------------------------------
    const handleChangeLastName = (value: string) => {
        setNewPatient({...newPatient, name:{first: newPatient.name.first, last: value}});
        // checkForValidation();
    }

    // Styles ----------------------------------
    let submitButtonClass: string = classnames (
        'ui primary button tiny ', {'disabled': !formValidation.formValid},
    );

    let firstNameInputContainer: string = classnames (
        'ui mini input', styles.inputContainer , `${formValidation.firstNameValid ? '' : 'error'}`,
    );

    // let firstNameError: string = classnames (
    //     'ui pointing red basic label',  styles.errors, `${formValidation.firstNameValid ? 'hide' : ''}`,
    // );

    let lastNameInputContainer: string = classnames (
        'ui mini input', styles.inputContainer , `${formValidation.lastNameValid ? '' : 'error'}`,
    );

    // let lastNameError: string = classnames (
    //     'ui pointing red basic label',  styles.errors, `${formValidation.lastNameValid ? 'hide' : ''}`,
    // );

    const addNewPatientForm = () => {
        return (
            <form className={`ui form ${styles.form}`} onSubmit={(e) => handleSubmit(e)}>
            <header>Add New Patient</header>
        <label>
        <h1>First Name:</h1>
        <div className={firstNameInputContainer}>
            <input type="text" placeholder={errMsg} value={newPatient.name.first} onChange={(e) => handleChangeFirstName(e.target.value)} onBlur={() => checkForValidation()}/>
            {/* <span className={firstNameError}>{errMsg}</span> */}
        </div>          
        </label>
        <label>
          <h1>Last Name:</h1>
          <div className={lastNameInputContainer}>
            <input type="text" placeholder={errMsg} value={newPatient.name.last} onChange={(e) => handleChangeLastName(e.target.value)} onBlur={() => checkForValidation()}/>
            {/* <span className={lastNameError}>{errMsg}</span> */}
          </div>          
        </label>
        <button
            type='submit'
            className={submitButtonClass}
        >Submit</button>
        <button className='ui secondary button tiny' onClick={(e) => cancelPatientButton(e)}>Cancel</button>
      </form>
        );
    }

    return(
        <div className={styles.newPatientContainer}>
            {addNewPatientForm()}
        </div>
    )
}

export default NewPatient;