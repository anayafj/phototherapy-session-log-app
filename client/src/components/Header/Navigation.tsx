import React from 'react';
import styles from '../../styles/components/Navigation.module.scss';
import classnames  from 'classnames';

function Navigation() {
	let btnsClass = classnames('ui basic buttons', styles.centerBtns);

	return (
		<nav className={styles.nav}>
			<div className={btnsClass}>
  				<button className="ui small button">Sessions</button>
  				<button className="ui small button">Notes</button>
  				<button className="ui small button">Photos</button>
			</div>
			<button className="fluid ui green small button">New Session</button>
		</nav>
	);
}

export default Navigation;