import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Polls from './polls';
import Vote from './vote';

class Poll extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/polls' component={Polls}/>
        <Route path='/polls/:_id' render={(props) => (<Vote auth={this.props.auth} username={this.props.username} {...props} /> )} />
      </Switch>
    );
  }
}

export default Poll;
