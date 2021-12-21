import { combineReducers } from 'redux';
import { authReducer } from './authenticationReducer';
import { patientReducer } from './patientReducer'

export default combineReducers({
    auth: authReducer,
    patient: patientReducer,
})