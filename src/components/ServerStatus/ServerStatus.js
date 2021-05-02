import React, {useState} from 'react';
import '../App/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../App/App'
import Login from '../Login/Login';

export default class ServerStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      server: [],
      lol: "",
    }

    this.data = [['Training-1', '202.61.251.79', '27015', '27020', 'hanspeter'],
                 ['Training-2', '202.61.251.79', '27016', '27021', 'hanspeter'],
                 ['PCW-Marcel', '202.61.251.79', '27018', '27018', 'ceopracc123'],
                 ['Pracc-Marcel', '202.61.251.79', '27017', '27022', 'ceopracc123'],
                 ['Felix-Test', '202.61.251.79', '12345', '12346', 'hanspeter'],
                 ['DM-Vorlage', '202.61.251.79', '27019', '27024', 'hanspeter']];

    
    for(const x of this.data.entries()) {
      this.state.server.push({dummy: "test"});
    }
  }

  componentDidMount() {
	const sso = sessionStorage.getItem('token');

    for(const x of this.data.entries()) {
      fetch('/api/server-status/status?ip=' + x[1][1] + '&port=' + x[1][2] + '&pw=' + x[1][4] + '&name=' + x[1][0] + '&goTV=' + x[1][3] + '&sso=' + sso).then(res => res.json()).then(data => {
        this.state.server[x[0]] = data;
        this.setState( {lol: "lul"})
      });
    } 
  }

  render() {
    const leftStyle = {'text-align': 'left', 'border-top': 'solid green 1px', 'width': '400px'};
    const greenStyle = {'border': 'solid green 1px', 'float': 'left'};
    const appHeader = {'background-color': '#282c34', 'min-height': '100vh', 'color': 'white', 'padding': '10px'}

    const content = this.state.server.map((post) =>
      <div style={greenStyle}>
        <h2>{post.name}</h2>
        <table style={leftStyle}>
          <tr><td>Name:</td><td>{post.hostname}</td></tr>
          <tr><td>Port/goTV:</td><td>{post.port} / {post.goTV}</td></tr>
          <tr><td>Map:</td><td>{post.map}</td></tr>
          <tr><td>Players:</td><td>{post.players}</td></tr>
          <tr><td>Uptime:</td><td>{Math.round(post.uptime)} std</td></tr>
        </table>
      </div>
    );

    return (
      <div className="App">
        <header style={appHeader}>
          <h1>Server-Status</h1>
          {content}
        </header>
      </div>
    );
  }
}
