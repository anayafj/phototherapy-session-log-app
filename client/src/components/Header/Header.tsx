import styles from '../../styles/components/Header.module.scss';
import classnames  from 'classnames';
import { useState, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import Navigation from './Navigation';
import Patient from './Patient';

enum LoginButtonText {IN = 'Log Out', OUT = 'Log In'};
enum LoginButtonIconText {IN = 'sign-out', OUT = 'sign-in'};
enum LoginButtonPaths {IN = 'api/logout', OUT = 'auth/google'};

type ButtonText = LoginButtonText;
type ButtonIcon = LoginButtonIconText;
type ButtonPath = LoginButtonPaths | string;

const Header = () => {
    let currentLocationPath: string = window.location.pathname;
    
    /// Redux Hooks --------------------------------------
    const auth = useAppSelector(state => state.therapy['auth']);

    // States
    const [loginBtnToggle, setLoginBtnToggle] = useState<boolean | null>(null);
    const [loginStatus, setLoginStatus] = useState<boolean | null>(null);

    // Text variables. loginBtnToggle (true = Logged In, false = Loged out)
    let loginBtnText:ButtonText = loginBtnToggle ? LoginButtonText.IN: LoginButtonText.OUT;
    let loginButtonIcon:ButtonIcon = loginBtnToggle ? LoginButtonIconText.IN: LoginButtonIconText.OUT;
    
    const loginButtonClickPath: ButtonPath = loginStatus ? LoginButtonPaths.IN : LoginButtonPaths.OUT;

    // React Hooks -----------------------------

    // programatic navigation hook
    const navigate = useNavigate();

    useEffect(() => {
        let loggedIn: boolean = auth.authenticated ? true: false;
        setLoginStatus(loggedIn);
    }, [auth.authenticated]);

    useEffect(() => {
        setLoginBtnToggle(loginStatus);
    }, [loginStatus]);

    useEffect(() => {
		if(loginStatus && currentLocationPath === "/"){
			navigate('/homebase');
		}
	},[loginStatus, currentLocationPath, navigate]);


    // Styles ------------------------------>

     let toggleButton:string = classnames(
        'ui small button',
        `${styles.loginBtn}`,
        `${loginStatus ? styles.onLogin : ''}`,
        {'orange': !loginBtnToggle}, 
        {'negative': loginBtnToggle}
        );

    let controlClasses:string = classnames(
        styles.controls,
        `${loginStatus ? styles.onLogin : ''}`,
    );

	return (
        <header className={styles.header}>
            <div className={styles.topContainer}>
                <div className={styles.logo}>Vitiligo Phototherapy Log</div>
                <div className={controlClasses}>
                    <Link
                        reloadDocument
                        to={loginButtonClickPath}
                        className={toggleButton}
                    >
                    <i className={`${loginButtonIcon} icon`}></i>
                    <span>{loginBtnText}</span>
                    </Link> 
                    <Navigation ContainerClass={`${loginStatus ? '' : 'hide'}`}/>
                </div>
            </div>
                <Patient PatientContainer={loginStatus} />
         </header>
	);
}

export default Header;