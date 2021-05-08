import React from 'react';
import '../App/App.css';
import update from 'react-addons-update';	

export default class ServerStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      server: [],
    }
  }

  componentDidMount() {
	  const sso = sessionStorage.getItem('token');

    fetch('/api/server-status/getServer?sso=' + sso).then(res => res.json()).then(data => {
      let i = 0;
      for(const x of data) {
        fetch('/api/server-status/status?ip=' + x.IP + '&port=' + x.port + '&pw=' + x.rconPW + '&name=' + x.name + '&goTV=' + x.gotvPort + '&sso=' + sso).then(res => res.json()).then(data => {
          this.setState(update(this.state, {
            server: {
              [i]: {
                $set: data
              }
            }
          }));
          
          i++;
        });
      }
    });
  }

  render() {
    const leftStyle = {'textAlign': 'left', 'borderTop': 'solid green 1px', 'width': '400px'};
    const greenStyle = {'border': 'solid green 1px', 'float': 'left'};
    const appHeader = {'backgroundColor': '#282c34', 'minHeight': '100vh', 'color': 'white', 'padding': '10px'}

    const content = this.state.server.map((post) =>
      <div key={post.name} style={greenStyle}>
        <h2>{post.name}</h2>
        <table style={leftStyle}>
          <tbody>
            <tr><td>Name:</td><td>{post.hostname}</td></tr>
            <tr><td>Port/goTV:</td><td>{post.port} / {post.goTV}</td></tr>
            <tr><td>Map:</td><td>{post.map}</td></tr>
            <tr><td>Players:</td><td>{post.players}</td></tr>
            <tr><td>Uptime:</td><td>{Math.round(post.uptime)} std</td></tr>
          </tbody>
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
