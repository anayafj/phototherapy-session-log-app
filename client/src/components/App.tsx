import React from 'react';
import Dashboard from './Dashboard';
import Header from './Header/Header';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>REACT HOME</h1>
				<p>the Frontend</p>
			</header>
			<Header />
			<Dashboard />
		</div>
	);
}

export default App;