export const FETCH_USER:string = "fetch_user" ;
export const LOGIN_USER:string = "login_user" ;
export const LOGOUT_USER:string = "logout_user" ;
export const FETCH_PATIENT:string = 'fetch_patient';
export const ADD_PATIENT:string = 'add_patient';

export interface AuthenticationState {
    authenticated: boolean | null | object;
}

export interface PatientState {
    _id: string,
    name: {
        first: string,
        last: string,
    } | null,
    created: Date | null,
    updated: { date: Date, user: string} | null,
    users: object | null,
}