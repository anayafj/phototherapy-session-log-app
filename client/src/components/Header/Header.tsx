import styles from '../../styles/components/Header.module.scss';
import classnames  from 'classnames';
import { useState, useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';

import { useAppSelector} from '../../hooks';
import Navigation from './Navigation';
import Patient from './Patient';

enum LoginButtonText {IN = 'Log Out', OUT = 'Log In'};
enum LoginButtonIconText {IN = 'sign-out', OUT = 'sign-in'};
enum LoginButtonPaths {IN = 'api/logout', OUT = 'auth/google'};

enum RedirectPage {IN = 'homebase', OUT = ''};

type ButtonText = LoginButtonText;
type ButtonIcon = LoginButtonIconText;
type ButtonPath = LoginButtonPaths | string;


const Header = () => {
    const currentLocationPath: string = window.location.pathname;

    // programatic navigation hook
    const navigate = useNavigate();
    
    /// Redux Hooks --------------------------------------
    const auth = useAppSelector(state => state.therapy['auth']);
    
    // States
    const [loginStatus, setLoginStatus] = useState<boolean | null>(null);

    // Text variables
    let loginBtnText:ButtonText = loginStatus ? LoginButtonText.IN: LoginButtonText.OUT;
    let loginButtonIcon:ButtonIcon = loginStatus ? LoginButtonIconText.IN: LoginButtonIconText.OUT;
    
    const loginButtonClickPath: ButtonPath = loginStatus ? LoginButtonPaths.IN : LoginButtonPaths.OUT;

    // console.log("auth.authenticated = ", auth.authenticated);

    // React Hooks -----------------------------
    useEffect(() => {
        setLoginStatus(auth.authenticated ? true : false)
    }, [auth.authenticated]);

    useEffect(() => {        
		if(loginStatus && currentLocationPath === "/"){
			navigate(RedirectPage.IN);
		} else if (!loginStatus){
            navigate(RedirectPage.OUT);
        }
	},[loginStatus, currentLocationPath, navigate]);

    // Styles ------------------------------>
     let toggleButton:string = classnames(
        'ui small button',
        `${styles.loginBtn}`,
        `${loginStatus ? styles.onLogin : ''}`,
        {'orange': !loginStatus}, 
        {'negative': loginStatus}
        );

    let controlClasses:string = classnames(
        styles.controls,
        `${loginStatus ? styles.onLogin : ''}`,
    );

    const renderPatientBar = () => {
        if(loginStatus === true){
            // console.log('auth = ',auth.authenticated._id);
            // const doctor: string =  auth.authenticated._id;
            return <Patient PatientContainer={auth.authenticated._id} />;
        } else {
            return <div className={styles.defaultBar}></div>; 
        }
    }

	return (
        <header className={styles.header}>
            <div className={styles.topContainer}>
                <div className={styles.logo}>Vitiligo Phototherapy Log</div>
                <div className={controlClasses}>
                    <Link  reloadDocument to={loginButtonClickPath} className={toggleButton}>
                        <i className={`${loginButtonIcon} icon`}></i>
                        <span>{loginBtnText}</span>
                    </Link> 
                    <Navigation ContainerClass={`${loginStatus ? '' : 'hide'}`}/>
                </div>
            </div>
            {renderPatientBar()}
         </header>
	);
}

export default Header;