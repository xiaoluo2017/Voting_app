import React, { Component } from 'react';
import Header from './header';
import Main from './main';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header 
        auth={this.props.auth} 
        username={this.props.username}
        authentication={this.props.authentication}
        />
        <div className="container">
          <Main 
          auth={this.props.auth} 
          username={this.props.username}
          />
        </div>
      </div>
    ); 
  }
}

export default App;
