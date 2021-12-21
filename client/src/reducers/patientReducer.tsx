import {PatientState, FETCH_PATIENT } from '../actions/types';
import { AnyAction } from 'redux';

const initialState: PatientState = {
    name : null,
};

export const patientReducer = (state = initialState, action: AnyAction) => {
    console.log("patientReducer - state : ",state);
    switch (action.type){
        case FETCH_PATIENT:
        return {...state, name: action.payload || false};
        default:
            return state;
}

}