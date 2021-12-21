export const FETCH_USER:string = "fetch_user" ;
export const LOGIN_USER:string = "login_user" ;
export const LOGOUT_USER:string = "logout_user" ;
export const FETCH_PATIENT:string = 'fetch_patient';

export interface AuthenticationState {
    authenticated: boolean | null | object;
}

export interface PatientState {
    name: {
        first: string,
        last: string,
    } | null,
}