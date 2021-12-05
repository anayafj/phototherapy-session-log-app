import React from 'react';
import styles from '../../styles/components/Navigation.module.scss';
import classnames  from 'classnames';

interface NavProps {
	ContainerClass : string,
}

const Navigation: React.FC<NavProps> = ({ ContainerClass }) => {
	let btnsClass = classnames('ui basic buttons', styles.centerBtns);

	// var for Login button classes
    let navContainerClass:string = classnames(
		ContainerClass,
		styles.nav,
	);

	return (
		<nav className={navContainerClass}>
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