import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Polls from './polls';
import Chart from './chart';
import Options from './options';

class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      _id: 0,
      pollUser: ""
    }
  }

  componentDidMount() {
    let _this = this;

    axios.post('/findPollById', {
      _id: this.props.match.params._id
    }) 
    .then(function(res) {
      return res.data[0];
    })
    .then(function(poll) {
      _this.setState({ 
        _id: poll._id,
        pollUser: poll.pollUser
      });
      let data = [];
      for (let i = 0; i < poll.options.length; i++) {
        data.push({
          option: poll.options[i],
          value: poll.votes[i]
        });
      }
      _this.setState({ 
        data: data
      });
    });
  } 

  render() {
    const gridInstance = (
      <Jumbotron>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <Options 
              auth={this.props.auth}
              username={this.props.username}
              handleSubmit = {(isCustom, custom, index) => {
                if (isCustom) {
                  const newOption = {
                    option: custom,
                    value: 1
                  }
                  this.setState({
                    data: this.state.data.concat(newOption)
                  });
                } else {
                  const data = this.state.data;
                  data[index].value++;
                  this.setState({
                    data
                  });
                }
              }}
              _id={this.props.match.params._id} 
              />
            </Col>
            <Col xs={12} md={8}>
              <Chart 
              data={this.state.data}
              _id={this.state._id}
              username={this.props.username}
              pollUser={this.state.pollUser}
              />
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
    );

    return (
      <div>
        {gridInstance}
      </div>
    );
  }
}

export default Vote;
