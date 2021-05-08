import React from 'react';
import '../App/App.css';
import CreateServer from "./CreateServer";
import update from 'react-addons-update';	

export default class ServerManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      server: [],
    }
  }

  componentDidMount() {
	  const sso = sessionStorage.getItem('token');
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Server-Manager</h1>
        </header>
        <body>
          <CreateServer/>
        </body>
      </div>
    );
  }
}
