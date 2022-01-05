import styles from '../../styles/components/NewPatient.module.scss';
import { useState } from 'react';

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

const NewPatient = () => {

    const [newPatient, setNewPatient] = useState<AddNewPatient>(initialState);

    // const handleNewPatientButton = (e: MouseEvent | React.MouseEvent) => {
    //     console.log("ADD New patient BTN HIT!!!");
    //     e.preventDefault();
    // }

    const handleSubmit = (e: MouseEvent | React.FormEvent) => {
        console.log("handleSubmit -- newPatient = ",newPatient);
        e.preventDefault();
    }

    const handleChangeFirstName = (value: string) => {
        console.log("handleChangeFirstName -- value = ",value);

        setNewPatient({...newPatient, name:{first: value, last: newPatient.name.last}});
        console.log("handleChangeFirstName -- newPatient = ",newPatient);
    }

    const handleChangeLastName = (value: string) => {
        console.log("handleChangeLastName -- value = ",value);

        setNewPatient({...newPatient, name:{first: newPatient.name.first, last: value}});
        console.log("handleChangeLastName -- newPatient = ",newPatient);
    }

    const addNewPatientForm = () => {
        return (
            <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          First Name:
          <input type="text" value={newPatient.name.first} onChange={(e) => handleChangeFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={newPatient.name.last} onChange={(e) => handleChangeLastName(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
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