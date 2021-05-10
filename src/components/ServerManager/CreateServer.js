import React, { useState } from 'react';
import '../App/App.css';
import update from 'react-addons-update';

async function sendRequest(serverName, serverTyp, serverPW, rconPW, sso) {
	const token = fetch('/api/server-manager/createServer?sso=' + sso, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
	  },
	  body: ('------WebKitFormBoundary7MA4YWxkTrZu0gW\n'
	  		+'Content-Disposition: form-data; name="serverName"\n\n'
	  		+ serverName
	  		+'\n------WebKitFormBoundary7MA4YWxkTrZu0gW\n'
	  		+'Content-Disposition: form-data; name="serverTyp"\n\n'
	  		+ serverTyp
			+'\n------WebKitFormBoundary7MA4YWxkTrZu0gW\n'
	  		+'Content-Disposition: form-data; name="serverPW"\n\n'
	  		+ serverPW
			+'\n------WebKitFormBoundary7MA4YWxkTrZu0gW\n'
	  		+'Content-Disposition: form-data; name="rconPW"\n\n'
	  		+ rconPW
	  		+'\n------WebKitFormBoundary7MA4YWxkTrZu0gW--')
	}).then(res => res.json()).then(data => {
        console.log(data.token)
		return data.token
      });

	return token
}

export default function Login() {
	const appHeader = { 'backgroundColor': '#282c34', 'minHeight': '100vh', 'color': 'white', 'padding': '10px' }

	const [serverName, setServerName] = useState();
	const [serverTyp, setServerTyp] = useState();
	const [serverPW, setServerPW] = useState();
	const [rconPW, setRconPW] = useState();

	const handleSubmit = async e => {
		e.preventDefault();
		const sso = sessionStorage.getItem('token');
		const response = await sendRequest(serverName, serverTyp, serverPW, rconPW, sso);
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
							<td><input type="text" onChange={e => setServerName(e.target.value)} /></td>
						</tr>
						<tr>
							<td>Typ: </td>
							<td><input type="text" onChange={e => setServerTyp(e.target.value)} /></td>
						</tr>
						<tr>
							<td>Login-PW: </td>
							<td><input type="text" onChange={e => setServerPW(e.target.value)} /></td>
						</tr>
						<tr>
							<td>rcon-PW: </td>
							<td><input type="text" onChange={e => setRconPW(e.target.value)} /></td>
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
