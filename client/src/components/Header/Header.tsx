import styles from '../../styles/components/Header.module.scss';
import classnames  from 'classnames';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import { AuthenticationState } from '../../actions/types';
import { useAppSelector, useAppDispatch } from '../../hooks';
// import { LogUserOut } from '../../actions';
import Navigation from './Navigation';

enum LoginButtonText {IN = 'Log Out', OUT = 'Log In'};
enum LoginButtonIconText {IN = 'sign-out', OUT = 'sign-in'};
enum LoginButtonPaths {IN = 'api/logout', OUT = 'auth/google'};

type ButtonText = LoginButtonText;
type ButtonIcon = LoginButtonIconText;
type ButtonPath = LoginButtonPaths | string;

// THINGS TO DO
// 1. Work on login credentials (email/password, google).
// 2. Get links working.

const Header = () => {
    /// Redux Hooks --------------------------------------
    const auth = useAppSelector(state => state.auth['auth']);
    // const dispatch = useAppDispatch();

    // States
    const [loginBtnToggle, setLoginBtnToggle] = useState<boolean | null>(null);
    const [loginStatus, setLoginStatus] = useState<boolean | null>(null);

    // Text variables. loginBtnToggle (true = Logged In, false = Loged out)
    let loginBtnText:ButtonText = loginBtnToggle ? LoginButtonText.IN: LoginButtonText.OUT;
    let loginButtonIcon:ButtonIcon = loginBtnToggle ? LoginButtonIconText.IN: LoginButtonIconText.OUT;
    
    const loginButtonClickPath: ButtonPath = loginStatus ? LoginButtonPaths.IN : LoginButtonPaths.OUT;

    //Login button handler
    // const loginButtonClicked = () => {
    //     // e.preventDefault();
    //     console.log("LoginButtonClicked -- loginStatus = ", loginStatus);
    //     console.log("LoginButtonClicked -- loginBtnToggle = ", loginBtnToggle);
    //     // if(loginStatus) dispatch(LogUserOut());
    //     // setBtnToggle(!btnToggle);
    //     // setLoginMode();

    //     switch(loginStatus){
    //         case null:
    //             console.log("BTN - null");
    //             break;
    //         case false:
    //             console.log("BTN - false");
                
    //         break;
    //         default:
    //             console.log("BTN - default");
                
    //     }
    // }

    // React Hooks -----------------------------
    useEffect(() => {
        setLoginStatus(auth.authenticated);
    }, [auth.authenticated]);

    useEffect(() => {
        setLoginBtnToggle(loginStatus);
    }, [loginStatus])


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

    // <----------------------------- Styles//    



	return (
        <header className={styles.header}>
            <div className={styles.logo}>LOGO</div>
            <div className={controlClasses}>
            <Link
                to= '/auth/google' //{loginButtonClickPath}
                className={toggleButton}
                // onClick={() => loginButtonClicked()}
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