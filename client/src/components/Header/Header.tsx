import React, { useState, useEffect } from 'react';
import styles from '../../styles/components/Header.module.scss';
import classnames  from 'classnames';
import Navigation from './Navigation';

enum LoginButtonText {IN = 'Log Out', OUT = 'Log In'};
enum LoginButtonIconText {IN = 'sign-out', OUT = 'sign-in'};

type ButtonText = LoginButtonText;
type ButtonIcon = LoginButtonIconText;

// THINGS TO DO
// 1. Work on login credentials (email/password, google).
// 2. Get links working.

const Header: React.FC = () => {
    // state for Login toggle button
    const [btnToggle, setBtnToggle] = useState<boolean | null>(false);

    // state for Login status
    const [loginStatus, setLoginStatus] = useState<boolean | null>(null);

    // var for Login button classes
    let toggleButton:string = classnames(
        'ui small button',
        `${styles.loginBtn}`,
        `${loginStatus ? styles.onLogin : ''}`,
        {'orange': !btnToggle}, 
        {'white basic': btnToggle}
        );

    let controlClasses:string = classnames(
        styles.controls,
        `${loginStatus ? styles.onLogin : ''}`,
        );

    // var for Login button text
    let loginBtnText:ButtonText = btnToggle ? LoginButtonText.IN: LoginButtonText.OUT;

    // var for Login button icon text
    let loginButtonIcon:ButtonIcon = btnToggle ? LoginButtonIconText.IN: LoginButtonIconText.OUT;
    

    const loginButtonClicked = () => {
        setBtnToggle(!btnToggle);
        setLoginMode();
    }

    const setLoginMode = () => {
        console.log("Login mode = ",loginStatus);
        setLoginStatus(!loginStatus);
    }

	return (
        <header className={styles.header}>
            <div className={styles.logo}>LOGO</div>
            <div className={controlClasses}>
                <button className={toggleButton} onClick={() => loginButtonClicked()}>
                    <i className={`${loginButtonIcon} icon`}></i>
                    <span>{loginBtnText}</span>
                </button>	
			    <Navigation ContainerClass={`${loginStatus ? '' : 'hide'}`}/>
            </div>
		
         </header>
	);
}

export default Header;