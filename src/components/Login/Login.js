import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';

async function loginUser(user, pass) {
	const token = fetch('/api/authentication/login', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
	  },
	  body: ('------WebKitFormBoundary7MA4YWxkTrZu0gW\n'
	  		+'Content-Disposition: form-data; name="user"\n\n'
	  		+ user
	  		+'\n------WebKitFormBoundary7MA4YWxkTrZu0gW\n'
	  		+'Content-Disposition: form-data; name="pass"\n\n'
	  		+ pass
	  		+'\n------WebKitFormBoundary7MA4YWxkTrZu0gW--')
	}).then(res => res.json()).then(data => {
		return data.token
      });

	return token
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(
      username,
      password
    );
    setToken(token);
	window.location.reload();
  }

  return(
	<div className="login-wrapper">
    	<h1>Please Log In</h1>
		<form onSubmit={handleSubmit}>
		<label>
			<p>Username</p>
			<input type="text" onChange={e => setUserName(e.target.value)}/>
		</label>
		<label>
			<p>Password</p>
			<input type="password" onChange={e => setPassword(e.target.value)}/>
		</label>
		<div>
			<button type="submit">Submit</button>
		</div>
		</form>
	</div>
  )
}

Login.propTypes = {
	setToken: PropTypes.func.isRequired
  }