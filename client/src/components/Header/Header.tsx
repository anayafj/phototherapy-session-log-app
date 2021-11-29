import React, { useState } from 'react';
import styles from '../../styles/components/Header.module.scss';
import classnames  from 'classnames';
import Navigation from './Navigation';

function Header() {
    const [btnToggle, setBtnToggle] = useState(false);

    let toggleButton = classnames(
        'ui small button',
        `${styles.loginBtn}`,
        {'orange': !btnToggle}, 
        {'white basic': btnToggle}
        );

    let btnText = btnToggle ? 'Log Out': 'Log In';


	return (
        <header className={styles.header}>
            <div className={styles.logo}>LOGO</div>
            <div className={styles.controls}>
            <button className={toggleButton} onClick={() => setBtnToggle(!btnToggle)}>
                <i className={`${btnToggle ? 'sign-out': 'sign-in'} icon`}></i>
                <span>{btnText}</span>
                </button>	
			<Navigation />
            </div>
		
         </header>
	);
}

export default Header;