import React from 'react';
import '../App/App.css';

export default class ServerStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      server: [],
      lol: "",
    }

    this.data = []
  }

  async componentDidMount() {
	  const sso = sessionStorage.getItem('token');

    await fetch('/api/server-status/getServer').then(res => res.json()).then(data => {
      //console.log(data);
      for(const x of data) {
        this.data.push([x.name, x.IP, x.port, x.gotvPort, x.rconPW])
      }
    });

    for(const x of this.data.entries()) {
      fetch('/api/server-status/status?ip=' + x[1][1] + '&port=' + x[1][2] + '&pw=' + x[1][4] + '&name=' + x[1][0] + '&goTV=' + x[1][3] + '&sso=' + sso).then(res => res.json()).then(data => {
        this.state.server[x[0]] = data;
        this.setState( {lol: "lul"})
      });
    } 
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
