import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux';
import { FETCH_USER, LOGOUT_USER } from './types';

export const fetchUser = () => async(dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: response.data});
}

export const LogUserOut = () => async(dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const response = await axios.get('/api/logout');
    dispatch({ type: LOGOUT_USER, payload: response.data});
}