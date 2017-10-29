import React, { Component } from 'react';
import { Jumbotron, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Polls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: []
    } 
  }

  componentDidMount() {
    var _this = this;
    fetch('/findPolls')
    .then(function(res) {
      return res.json();
    })
    .then(function(polls) {
      _this.setState({ 
        polls: polls
      });
    });
  }

  render() {
    const jumbotronInstance = (
      <Jumbotron>
        <h1>Voting</h1>
        <p>Create custom polls with live results</p>
        <p><Link to='/newpoll'><Button bsStyle="primary">New Poll</Button></Link></p>
      </Jumbotron>
    );

    const listgroupInstance = (
      <ListGroup>
        {
          this.state.polls.map((poll, idx) => {
            return (
              <div>
                {(this.props.showAll || poll.pollUser === this.props.username) &&
                <Link to={'/polls/' + poll._id}>
                  <ListGroupItem key={idx} href="#">
                    {poll.title}
                  </ListGroupItem>
                </Link>}
              </div>
            )
          })
        }
      </ListGroup>
    );

    return (
      <div>
        {jumbotronInstance}
        {listgroupInstance}
      </div>
    );
  }
}

export default Polls;
