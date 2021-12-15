import styles from '../../styles/components/Header.module.scss';
import classnames  from 'classnames';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import Navigation from './Navigation';

enum LoginButtonText {IN = 'Log Out', OUT = 'Log In'};
enum LoginButtonIconText {IN = 'sign-out', OUT = 'sign-in'};
enum LoginButtonPaths {IN = 'api/logout', OUT = 'auth/google'};

type ButtonText = LoginButtonText;
type ButtonIcon = LoginButtonIconText;
type ButtonPath = LoginButtonPaths | string;

// THINGS TO DO
// 2. Get links working.

const Header = () => {
    /// Redux Hooks --------------------------------------
    const auth = useAppSelector(state => state.auth['auth']);

    // States
    const [loginBtnToggle, setLoginBtnToggle] = useState<boolean | null>(null);
    const [loginStatus, setLoginStatus] = useState<boolean | null>(null);

    // Text variables. loginBtnToggle (true = Logged In, false = Loged out)
    let loginBtnText:ButtonText = loginBtnToggle ? LoginButtonText.IN: LoginButtonText.OUT;
    let loginButtonIcon:ButtonIcon = loginBtnToggle ? LoginButtonIconText.IN: LoginButtonIconText.OUT;
    
    const loginButtonClickPath: ButtonPath = loginStatus ? LoginButtonPaths.IN : LoginButtonPaths.OUT;

    // React Hooks -----------------------------
    useEffect(() => {
        let loggedIn: boolean = auth.authenticated ? true: false;
        console.log("auth.authenticated = ", auth.authenticated);
        console.log("loggedIn = ",loggedIn);
        setLoginStatus(loggedIn);
    }, [auth.authenticated]);

    useEffect(() => {
        setLoginBtnToggle(loginStatus);
    }, [loginStatus]);


    // Styles ------------------------------>
     // var for Login button classes
     let toggleButton:string = classnames(
        'ui small button',
        `${styles.loginBtn}`,
        `${loginStatus ? styles.onLogin : ''}`,
        {'orange': !loginBtnToggle}, 
        {'white basic': loginBtnToggle}
        );

    let controlClasses:string = classnames(
        styles.controls,
        `${loginStatus ? styles.onLogin : ''}`,
        );

    // Helper functions ------------------------>>
    const manualRefresh = () => {
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

	return (
        <header className={styles.header}>
            <div className={styles.logo}>LOGO</div>
            <div className={controlClasses}>
            <Link
                onClick={manualRefresh}
                to={loginButtonClickPath}
                className={toggleButton}
            >
                <i className={`${loginButtonIcon} icon`}></i>
                <span>{loginBtnText}</span>
            </Link>
			    <Navigation ContainerClass={`${loginStatus ? '' : 'hide'}`}/>
            </div>
		
         </header>
	);
}

export default Header;