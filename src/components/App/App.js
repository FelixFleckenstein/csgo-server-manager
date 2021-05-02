import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ServerStatus from '../ServerStatus/ServerStatus'
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
        <header>
          <h1>Startseite</h1>

          <BrowserRouter>
            <Switch>
              <Route path="/server-status" component={ServerStatus} />
            </Switch>
          </BrowserRouter>
        </header>
      </div>
    );
  }
}
