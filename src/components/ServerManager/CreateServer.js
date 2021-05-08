import React, { useState } from 'react';
import '../App/App.css';
import update from 'react-addons-update';

export default function Login() {
	const appHeader = { 'backgroundColor': '#282c34', 'minHeight': '100vh', 'color': 'white', 'padding': '10px' }

	const [username, setUserName] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async e => {
		e.preventDefault();
		const sso = sessionStorage.getItem('token');
		await fetch('/api/server-manager/createServer?sso=' + sso)
		window.location.reload();
	}

	return (
		<div className="App">
			<header style={appHeader}>
				<h1>Create a new Server</h1>
				<form onSubmit={handleSubmit}>
					<table style={{marginLeft: 'auto', marginRight: 'auto'}}>
						<tr>
							<td>Server-Name: </td>
							<td><input type="text" onChange={e => setUserName(e.target.value)} /></td>
						</tr>
						<tr>
							<td>Typ: </td>
							<td><input type="text" onChange={e => setUserName(e.target.value)} /></td>
						</tr>
						<tr>
							<td>Login-PW: </td>
							<td><input type="text" onChange={e => setUserName(e.target.value)} /></td>
						</tr>
						<tr>
							<td>rcon-PW: </td>
							<td><input type="text" onChange={e => setUserName(e.target.value)} /></td>
						</tr>
						<tr>
							<td></td>
							<td><button type="submit">Submit</button></td>
						</tr>
					</table>
				</form>
			</header>
		</div>
	);
}
