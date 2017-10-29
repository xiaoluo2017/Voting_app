import React, { Component } from 'react';
import { Jumbotron, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class NewPoll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      options: "",
      _id: 0,
      redirect: false
    }
  }

  handleTitle = (event) => {
    this.setState({
      title: event.target.value
    });
  }

  handleOptions = (event) => {
    this.setState({
      options: event.target.value
    });
  }

  addPoll = () => {
    let _this = this;
    if (this.props.auth) {
      let votes = new Array(this.state.options.split('\n').length).fill(0);
      axios.post('/insertPoll', {
        title: this.state.title,
        options: this.state.options.split('\n'),
        votes: votes,
        pollUser: this.props.username
      }).then(function(res) {
        _this.setState({
          title: "",
          options: "",
          _id: res.data.insertedIds[0],
          redirect: true
        });
      });
    } else {
      alert("You need to first sign in");
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={'/polls/' + this.state._id} />;
    }

    const jumbotronInstance = (
      <Jumbotron>
        <h1>Make a new poll!</h1>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Title:</ControlLabel>
          <FormControl value={this.state.title} onChange={this.handleTitle} type="text" />
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Options (seperated by line):</ControlLabel>
          <FormControl value={this.state.options} onChange={this.handleOptions} componentClass="textarea" rows="8" />
        </FormGroup>
        <p><Button bsStyle="primary" onClick={this.addPoll}>Make!</Button></p>
      </Jumbotron>
    );

    return (
      <div>
        {jumbotronInstance}
      </div>
    );
  }
}

export default NewPoll;
