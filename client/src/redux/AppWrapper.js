import React, { Component } from 'react';
import App from '../components/App';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, withRouter } from 'react-router-dom';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const userLogin = (username) => {
  return {
    type: LOGIN,
    username
  }
};

const userLogout = (username) => {
  return {
    type: LOGOUT,
    username
  }
};

const authReducer = (state = {auth: false, username: "My Account"}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        auth: true,
        username: action.username
      }
      break;
    case LOGOUT:
      return {
        auth: false,
        username: ""
      }
      break;
    default:
      return state;
  }
};

const store = createStore(authReducer);

const mapStateToProps = (state) => {
  return { 
    auth: state.auth,
    username: state.username
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    authentication: (auth, username) => {
      if (auth) {
        dispatch(userLogin(username))
      } else {
        dispatch(userLogout(username))
      }
    }
  }
};

const Container = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store = {store}>
        <BrowserRouter>
          <Container />
        </BrowserRouter>
      </Provider>
    );
  }
};

export default AppWrapper;
