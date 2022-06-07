import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
	const [status, setStatus] = useState(false);
	useEffect(() => {
		axios.get(`/api/status`)
			.then(function (response) {
				if (response.data.status) {
					setStatus(true);
				}
			})
			.catch(function (error) {
				console.log(error);
			})
	}, []);

	return (
		<div className='App'>
			<header className='App-header'>
                <img src='images/cmc.svg' width='200' alt='cmc-log' />
				<img src={logo} className='App-logo' alt='logo' />
				{status && <p><strong>OK</strong></p>}
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
