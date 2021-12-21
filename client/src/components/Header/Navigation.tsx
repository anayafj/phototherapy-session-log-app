import React from 'react';
import { Link} from 'react-router-dom';
import styles from '../../styles/components/Navigation.module.scss';
import classnames  from 'classnames';

interface NavProps {
	ContainerClass : string,
}

const Navigation: React.FC<NavProps> = ({ ContainerClass }) => {
	
	// Styles ------------------------------->>> 
	let btnsClass = classnames('ui buttons', styles.centerBtns);

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
		<nav className={ContainerClass}>
			<div className={btnsClass}>
  				<Link to='/sessions' className={sessionsButton}>
				  <i className="list alternate outline icon"></i>
					  Sessions
				</Link>
  				<Link to='/notepad' className={notesButton}>
				  	<i className="sticky note outline icon"></i>
					  Notes
				</Link>
  				<Link to='/gallery' className={photosButton}>
				  <i className="image outline icon"></i>
					  Photos
				</Link>
			</div>
		</nav>
	);
}

export default Navigation;