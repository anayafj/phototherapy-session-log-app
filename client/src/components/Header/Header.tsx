import React, { useState } from 'react';
import styles from '../../styles/components/Header.module.scss';
import classnames  from 'classnames';
import Navigation from './Navigation';

type ButtonText = 'Log Out'| 'Log In';
type LoginButtonIcon = 'sign-out' | 'sign-in';

// THINGS TO DO
// 1. add useRef to track the login status.
// 2. Adjust method to show navigaion only once logged in.
// 3. Get links working.
// 4. Work on login credentials (email/password, google).

function Header() {
    // state for Login toggle button
    const [btnToggle, setBtnToggle] = useState<true | false>(false);
    // state for Login status
    const [loginStatus, setLoginStatus] = useState<true | false>(false);

    // var for Login button classes
    let toggleButton:string = classnames(
        'ui small button',
        `${styles.loginBtn}`,
        {'orange': !btnToggle}, 
        {'white basic': btnToggle}
        );

    // var for Login button text
    let btnText:ButtonText = btnToggle ? 'Log Out': 'Log In';
    // var for Login button icon text
    let loginButtonIcon:LoginButtonIcon = btnToggle ? 'sign-out': 'sign-in';

    const loginButtonClicked = () => {
        setBtnToggle(!btnToggle)
    }

    const setLoginMode = () => {
        console.log("Login mode = ",loginStatus);
    }

	return (
        <header className={styles.header}>
            <div className={styles.logo}>LOGO</div>
            <div className={styles.controls}>
                <button className={toggleButton} onClick={() => loginButtonClicked()}>
                    <i className={`${loginButtonIcon} icon`}></i>
                    <span>{btnText}</span>
                </button>	
			    <Navigation />
            </div>
		
         </header>
	);
}

export default Header;