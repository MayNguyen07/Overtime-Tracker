/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import reducer from './reducer';
import saga from './saga';

import { AppState } from 'reducers';
import { loginRequest } from './actions';
import './index.css';

import { Nav } from 'react-bootstrap';

const key = 'auth';

const HomePage = (props: any) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { loginRequest, auth } = props;
  const [modalShow, setModalShow] = useState(false);
  const responseGoogle = response => {
    loginRequest(response);
  };

  return (
    <React.Fragment>
      <div className="wrapper-image">
        <Nav className="justify-content">
          <Nav.Item>
            <Nav.Link
              style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }}
              href="/"
            >
              OT REQUEST
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <div className="login-form">
          <h1>USER LOGIN</h1>
          <p>
            <GoogleLogin
              clientId="408823552815-0sd6ge26aseh9ai4qplvp4gg1ch8skas.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              className="loginGG"
            />{' '}
          </p>
          <p style={{ color: 'red', fontSize: '20px' }}>{auth.loginError}</p>
        </div>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state: AppState) => {
  const {} = state;
  return state;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginRequest }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
