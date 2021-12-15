import {AuthenticationState, FETCH_USER, LOGOUT_USER, LOGIN_USER } from '../actions/types';
import { AnyAction } from 'redux';
// import _ from "lodash";

const initialState: AuthenticationState = {
    authenticated : null,
};

export const authReducer = (state = initialState, action: AnyAction) => {
    // console.log(action);
    switch (action.type){
        case FETCH_USER:
            return {...state, authenticated: action.payload || false};
            case LOGIN_USER:
                return state;
        case LOGOUT_USER:
            console.log('authReducer - action = ', action.payload);
            console.log('authReducer - state = ', state);
            return {...state, authenticated: false};
            default:
                return state;
    }
    
}