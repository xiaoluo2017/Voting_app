import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal, Button, FormGroup, FormControl, Col, ControlLabel, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isRegister: true,
      display: false,
      alert: false
    }
  }

  handleLogIn = () => {
    let _this = this;
    axios.post('/checkUser', {
      username: this.state.username,
      password: this.state.password
    }).then(function(res) {
      if (res.data) {
        _this.props.authentication(true, _this.state.username);
        _this.setState({
          display: false,
          alert: false
        });
      } else {
        _this.setState({
          alert: true
        });
      }
    })
  }

  handleLogOut = () => {
    this.props.authentication(false, "");
    this.setState({
      alert: false
    });
  }

  handleRegister = () => {
    let _this = this;
    axios.post('/insertUser', {
      username: this.state.username,
      password: this.state.password
    }).then(function(res) {
      if (res.data) {
        _this.setState({
          alert: true
        });
      } else {
        _this.props.authentication(true, _this.state.username);
        _this.setState({
          display: false,
          alert: false
        });
      }
    })
  }

  displayLogIn = () => {
    this.setState({
      display: true,
      isRegister: false,
      alert: false
    });
  }

  displayRegister = () => {
    this.setState({
      display: true,
      isRegister: true,
      alert: false
    });
  }

  closeModal = () => {
    this.setState({
      display: false,
      alert: false
    });
  }

  handleUsername = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    const login = (
      <Nav pullRight>
        <NavItem eventKey={1}><Link to='/'>Home</Link></NavItem>
        <NavItem eventKey={2}><Link to='/mypolls'>My Polls</Link></NavItem>
        <NavItem eventKey={3}><Link to='/newpoll'>New Poll</Link></NavItem>
        <NavDropdown eventKey={4} title={this.props.username} id="basic-nav-dropdown">
          <MenuItem eventKey={4.1} onChange onClick={this.handleLogOut}>Log Out</MenuItem>
        </NavDropdown>
      </Nav>
    );

    const logout = (
      <Nav pullRight>
        <NavItem eventKey={1}><Link to='/'>Home</Link></NavItem>
        <NavDropdown eventKey={2} title="My Account" id="basic-nav-dropdown">
          <MenuItem eventKey={2.1} onChange onClick={this.displayLogIn}>Log In</MenuItem>
          <MenuItem eventKey={2.2} onChange onClick={this.displayRegister}>Register</MenuItem>
        </NavDropdown>
      </Nav>
    );

    const navbarInstance = (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>Voting</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.props.auth ? login : logout}
        </Navbar.Collapse>
      </Navbar>
    );

    const alertLogInInstance = (
      <Alert bsStyle="danger">
        The username you entered doesn't belong to an account. Please check your username and try again.
      </Alert>
    );

    const alertRegisterInstance = (
      <Alert bsStyle="danger">
        Username has already been taken
      </Alert> 
    );

    const modalInstance = (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Voting</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                 Username
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsername} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword} />
                </Col>
              </FormGroup>
            </Form>
            {this.state.alert && (this.state.isRegister ? alertRegisterInstance : alertLogInInstance)}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
            {this.state.isRegister 
              ? <Button bsStyle="primary" onClick={this.handleRegister}>Register</Button>
              : <Button bsStyle="primary" onClick={this.handleLogIn}>Log in</Button>
            }
            {this.state.isRegister 
              ? <div><h6>Have an account? <a onClick={this.displayLogIn}>Log in</a></h6></div>
              : <div><h6>Don't have an account? <a onClick={this.displayRegister}>Sign up</a></h6></div>
            }
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );

    return (
      <div>
        {navbarInstance}
        {this.state.display && modalInstance}
      </div>
    );
  }
}

export default Header;
