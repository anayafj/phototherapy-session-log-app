import { combineReducers } from 'redux';
import { authReducer } from './authenticationReducer';

export default combineReducers({
    auth: authReducer,
})