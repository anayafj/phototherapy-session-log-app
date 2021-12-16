import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/Navigation.module.scss';
import classnames  from 'classnames';

interface NavProps {
	ContainerClass : string,
}

const Navigation: React.FC<NavProps> = ({ ContainerClass }) => {
	
	// Styles ------------------------------->>> 
	let btnsClass = classnames('ui buttons', styles.centerBtns);

    let navContainerClass:string = classnames(
		ContainerClass,
		styles.nav,
	);

	let sessionsButton:string = classnames(
		"ui tiny button"
	);

	let notesButton:string = classnames(
		"ui tiny button"
	);

	let photosButton:string = classnames(
		"ui tiny button"
	);

	return (
		<nav className={navContainerClass}>
			<div className={btnsClass}>
  				<Link to='/dashboard' className={sessionsButton}>
				  <i className="list alternate outline icon"></i>
					  Sessions
				</Link>
  				<Link to='/notes'className={notesButton}>
				  	<i className="sticky note outline icon"></i>
					  Notes
				</Link>
  				<Link to='/dashboard' className={photosButton}>
				  <i className="image outline icon"></i>
					  Photos
				</Link>
			</div>
		</nav>
	);
}

export default Navigation;