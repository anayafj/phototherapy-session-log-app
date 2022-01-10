import {PatientState, FETCH_PATIENT, ADD_PATIENT } from '../actions/types';
import { AnyAction } from 'redux';

const initialState: PatientState = {
    name : null,
    created: null,
    updated: null,
    users : null,
};

export const patientReducer = (state = initialState, action: AnyAction) => {
    console.log("patientReducer - state : ",state);
    console.log("patientReducer - action : ",action);
    switch (action.type){
        case FETCH_PATIENT:
        return action.payload || false;
        // return state;
        case ADD_PATIENT:
            return state;
        default:
            return state;
}

}