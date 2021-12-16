import {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUser } from '../actions';

import Landing from './Landing';
import Dashboard from './Dashboard';
import Notes from './Notes';
import Header from './Header/Header';

function App () {
	/// Redux Hooks --------------------------------------
    const auth = useAppSelector(state => state.auth['auth']);
	const dispatch = useAppDispatch();

	console.log(auth);

	useEffect(() => {
	  dispatch(fetchUser());
	},[dispatch]);

	return (
		<Router>
			<div className="wrapper">
				<Header />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/homebase" element={<Dashboard />} />
					<Route path="/notepad" element={<Notes />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;