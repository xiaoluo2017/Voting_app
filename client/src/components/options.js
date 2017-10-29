import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, MenuItem, Alert } from 'react-bootstrap';
import axios from 'axios';

class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      _id: 0,
      title: "",
      options: [],
      votes: [],
      index: 0,
      custom: "",
      alert: false,
      success: false,
      pollUser: ""
    }
  }

  componentDidMount() {
    let _this = this;
    axios.post('/findPollById', {
      _id: this.props._id
    }) 
    .then(function(res) {
      return res.data[0];
    })
    .then(function(data) {
      _this.setState({ 
        _id: data._id,
        title: data.title,
        options: data.options,
        votes: data.votes,
        pollUser: data.pollUser
      });
    });
  } 

  handleClick = () => {
    const _this = this;
    if (this.props.auth) {
      if (this.state.index == this.state.options.length) {
        axios.post('/updateVote', {
          isCustom: true,
          _id: this.state._id,
          custom: this.state.custom
        }).then(function(res) {
          if (res.data) {
            _this.setState({
              alert: true,
              success: false
            });
          } else {
            _this.setState({
              alert: false,
              success: true
            });
            _this.props.handleSubmit(true, _this.state.custom, 0);
            _this.setState({
              votes: _this.state.options.concat(1),
              options: _this.state.options.concat(_this.state.custom)
            }); 
          }
        });
      } else {
        axios.post('/updateVote', {
          isCustom: false,
          _id: this.state._id,
          index: this.state.index,
          votes: this.state.votes[this.state.index] + 1,
          username: this.props.username
        }).then(function(res) {
          if (res.data) {
            _this.setState({
              alert: true,
              success: false
            });
          } else {
            _this.setState({
              alert: false,
              success: true
            });
            _this.props.handleSubmit(false, "", _this.state.index);
          }
        });
      }
    } else {
      alert("You need to first sign in.");
    }
  }

  handleCustom = (event) => {
    this.setState({
      custom: event.target.value
    });
  }

  handleOptions = (event) => {
    this.setState({
      index: event.target.value
    });
  }

  render() {
    const optionsInstance = (
      <form>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel></ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.handleOptions}>
            {
              this.state.options.map((option, idx) => {
                return (
                  <option key={idx} value={idx}>
                    {option}
                  </option>
                )
              })
            }
            <hr />
            <option key={this.state.options.length} value={this.state.options.length}>
              I'd like a custom option
            </option>
          </FormControl>
        </FormGroup>
        {this.state.index == this.state.options.length && <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Vote with my own option:</ControlLabel>
          <FormControl value={this.state.custom} type="text" onChange={this.handleCustom}/>
        </FormGroup>}
        <Button bsStyle="primary" block onClick={this.handleClick}>
          Submit
        </Button>
      </form>
    );

    const alertInstance = (
      <Alert bsStyle="danger">
        Error: You can only vote once a poll. [user-voted]
      </Alert>
    );

    const successInstance = (
      <Alert bsStyle="success">
        You've voted for {this.state.options[this.state.index]}
      </Alert>
    );

    return (
      <div>
        <h2>{this.state.title}</h2>
        <h5>by <em><strong>{this.state.pollUser}</strong></em></h5>
        {optionsInstance}
        {this.state.alert && alertInstance}
        {this.state.success && successInstance}
      </div>
    );
  }
}

export default Options;
