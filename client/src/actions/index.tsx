import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import { FETCH_USER, ADD_PATIENT, FETCH_PATIENT, LOGIN_USER, LOGOUT_USER } from './types';

export const fetchUser = () => async(dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    // console.log("Fetch User action");
    const response = await axios.get('/api/current_user');
    // console.log("Fetch User action - Dispatch - payload = ",response);
    dispatch({ type: FETCH_USER, payload: response.data});
}

export const LogUserOut = () => async(dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await axios.get('/api/logout');
    dispatch({ type: LOGOUT_USER, payload: response.data});
}

export const LoginOauth = () => async(dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await axios.get('/auth/google');
    dispatch({ type: LOGIN_USER, payload: response});
}

export const fetchPatient = () => async(dispatch: ThunkDispatch<{},{}, AnyAction>) => {
    // console.log("FETCH_PATIENT action");
    const response = await axios.get('/api/patient');
    // console.log("FETCH_PATIENT action - After Await");
    dispatch({type: FETCH_PATIENT, payload: response.data});
}

export const addPatient = (name: object) => async(dispatch: ThunkDispatch<{},{}, AnyAction>) => {
    // console.log("ADD_PATIENT action");
    const response = await axios.post('/api/patient', name);
    // console.log("ADD_PATIENT action - After Await");
    dispatch({type: ADD_PATIENT, payload: response.data});
}