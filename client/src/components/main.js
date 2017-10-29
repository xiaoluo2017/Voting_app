import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Polls from './polls';
import Newpoll from './newPoll';
import Poll from './poll';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={(props) => (<Polls showAll={true} auth={this.props.auth} {...props} /> )} />
          <Route path='/newpoll' render={(props) => (<Newpoll auth={this.props.auth} username={this.props.username} {...props} /> )} />
          <Route path='/polls' render={(props) => (<Poll showAll={true} auth={this.props.auth} username={this.props.username} {...props} /> )} />
          <Route path='/mypolls' render={(props) => (<Polls showAll={false} username={this.props.username} {...props} /> )} />
        </Switch>
      </main>
    );
  }
}

export default Main;
