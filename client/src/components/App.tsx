import {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { useAppDispatch} from '../hooks';
import { fetchUser } from '../actions';

import Landing from './Landing';
import Dashboard from './Dashboard';
import Sessions from './Sessions';
import Notes from './Notes';
import Photos from './Photos';
import Header from './Header/Header';

function App () {
	/// Redux Hooks --------------------------------------
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	return (
		<Router>
			<div className="wrapper">
				<Header />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/homebase" element={<Dashboard />} />
					<Route path="/sessions" element={<Sessions />} />
					<Route path="/notepad" element={<Notes />} />
					<Route path="/gallery" element={<Photos />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;