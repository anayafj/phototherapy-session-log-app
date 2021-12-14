import {AuthenticationState, FETCH_USER, LOGOUT_USER } from '../actions/types';
import { AnyAction } from 'redux';
import _ from "lodash";

const initialState: AuthenticationState = {
    authenticated : false,
};

export const authReducer = (state = initialState, action: AnyAction) => {
    
    switch (action.type){
        case FETCH_USER:
            if(_.isEmpty(action.payload) === true){
                return {...state, authenticated: false};
            }
            return {...state, authenticated: true};
        case LOGOUT_USER:
            console.log('authReducer - action = ', action.payload);
            console.log('authReducer - state = ', state);
            return {...state, authenticated: false};
            default:
                return state;
    }
    
}