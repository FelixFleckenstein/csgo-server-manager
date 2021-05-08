import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ServerStatus from '../ServerStatus/ServerStatus'
import ServerManager from '../ServerManager/ServerManager'
import Login from '../Login/Login';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      server: [],
      token: ""
    }
    this.setToken = this.setToken.bind(this);
  }

  componentDidMount() {
  }

  setToken(userToken) {
    this.setState( {token: userToken})
    sessionStorage.setItem('token', userToken);
    console.log(userToken)
  }

  getToken() {
    const tokenString = sessionStorage.getItem('token');
    return tokenString
  }

  render() {
    this.state.token = this.getToken();

    if(!this.state.token) {
      return <Login setToken={this.setToken} />
    }

    return (
      <div className="App">
        <header style={{height: '50px', backgroundColor: '#AAAAAA'}}>
          <div style={{borderRight: 'solid black 1px', float: 'left', height: '100%', width: '120px', backgroundColor: '#666666'}}>
            <a href="server-status" style={{display: 'blocK', height: '100%'}}>
              Server-Status
            </a>
          </div>
          <div style={{borderRight: 'solid black 1px', float: 'left', height: '100%', width: '120px', backgroundColor: '#666666'}}>
            <a href="server-manager" style={{display: 'blocK', height: '100%'}}>
              Server-Manager
            </a>
          </div>
          <div style={{borderLeft: 'solid black 1px', float: 'right', height: '100%', width: '120px', backgroundColor: '#666666'}}>
            <a href="user" style={{display: 'blocK', height: '100%'}}>
              User
            </a>
          </div>
          <h1 style={{margin: '2px'}}>CS:GO Server-Manager</h1>
        </header>
        <body>
          <BrowserRouter>
            <Switch>
              <Route path="/server-status" component={ServerStatus} />
              <Route path="/server-manager" component={ServerManager} />
            </Switch>
          </BrowserRouter>
        </body>
      </div>
    );
  }
}
