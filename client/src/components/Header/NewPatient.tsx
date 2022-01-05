import styles from '../../styles/components/NewPatient.module.scss';
import classnames  from 'classnames';
import React, { useState, useEffect } from 'react';

interface NewPatientProps {
    cancelNewPatient: any
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

// interface PatientFormValidation {
//     firstNameValid: boolean,
//     lastNameValid: boolean,
//     formValid: boolean,
//     formError: boolean,
// }

// const formInitialState: PatientFormValidation = {
//     firstNameValid: false,
//     lastNameValid: false,
//     formValid: false,
//     formError: false,
// }

const NewPatient: React.FC <NewPatientProps> = ({cancelNewPatient}) => {

    const [newPatient, setNewPatient] = useState<AddNewPatient>(initialState);
    // const [formValidation, setFormValidation] = useState<PatientFormValidation>(formInitialState);

    // const handleNewPatientButton = (e: MouseEvent | React.MouseEvent) => {
    //     console.log("ADD New patient BTN HIT!!!");
    //     e.preventDefault();
    // }




    // const validateForm = (validateField: string) => {

    //     console.log("validateForm -- validateField = ",validateField);
    //         switch(validateField){
    //             case 'first':
    //                 console.log("validateForm -- newPatient.name.first.length = ",newPatient.name.first.length);
    //                 if(newPatient.name.first.length >= 2){
    //                     console.log("formValidation first true");
    //                     setFormValidation({...formValidation, firstNameValid: true});
    //                 } else {
    //                     console.log("formValidation first false");
    //                     setFormValidation({...formValidation, firstNameValid: false});
    //                 }
    //             break;
    //             case 'last':
    //                 if(newPatient.name.last.length >= 2){
    //                     setFormValidation({...formValidation, lastNameValid: true});
    //                 } else {
    //                     setFormValidation({...formValidation, lastNameValid: false});
    //                 }
    //             break;
    //         }

    //         updateFormValidation();

    //         console.log("formValidation = ",formValidation);
    // }

    // const updateFormValidation = () => {
    //     setFormValidation({...formValidation, formValid: formValidation.firstNameValid && formValidation.lastNameValid});

    //     console.log("updateFormValidation -- formValidation = ",formValidation);
    // }

    // On Valid Form send -------------------------------------
    const handleSubmit = (e: MouseEvent | React.FormEvent) => {
        console.log("handleSubmit -- newPatient = ",newPatient);
        e.preventDefault();
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
        // validateForm('first');
    }

    // On Second Name field change -------------------------------------
    const handleChangeLastName = (value: string) => {
        setNewPatient({...newPatient, name:{first: newPatient.name.first, last: value}});
        // validateForm('last');
    }

    // Styles ----------------------------------
    let submitButtonClass: string = classnames (
        'ui primary button tiny ', //{'disabled': !formValidation.formValid},
    );

    const addNewPatientForm = () => {
        return (
            <form className='ui form' onSubmit={(e) => handleSubmit(e)}>
        <label>
        <h1>First Name:</h1>
        <div className="ui mini input">
            <input type="text" placeholder="First Name..." value={newPatient.name.first} onChange={(e) => handleChangeFirstName(e.target.value)} />
        </div>          
        </label>
        <label>
          <h1>Last Name:</h1>
          <div className="ui mini input">
            <input type="text" placeholder="Last Name..." value={newPatient.name.last} onChange={(e) => handleChangeLastName(e.target.value)} />
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