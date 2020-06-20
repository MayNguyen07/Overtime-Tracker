/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { AdminPostFetch } from './action';
import { AppState } from 'reducers';
import { useInjectSaga, useInjectReducer } from 'redux-injectors';
import { Form, Button, Navbar } from 'react-bootstrap';
import saga from './saga';
import reducer from './reducer';
import './index.css';
const key = 'adminLogin';

function loginAdmin(props) {
  useInjectSaga({ key: key, saga: saga });
  useInjectReducer({ key: key, reducer: reducer });
  const { onSubmit, admin } = props;
  const { register, handleSubmit, errors } = useForm();

  const onFormSubmit = data => {
    onSubmit(data);
  };

  return (
    <div>
      <Navbar className="content">
        <Navbar.Brand
          style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }}
          href="/"
        >
          OT REQUEST
        </Navbar.Brand>
      </Navbar>

      <div className=" login container-fluid">
        <div className="form shadow">
          <h1> ADMIN LOGIN</h1>
          <Form onSubmit={handleSubmit(onFormSubmit)} className="form-style">
            <Form.Group>
              <input
                className="styleinput"
                type="text"
                placeholder=" Enter your e-mail"
                name="email"
                ref={register({
                  required: true,
                })}
              />
              {errors.email && <p className="warning">E-Mail is required</p>}
            </Form.Group>
            <Form.Group>
              <input
                className="styleinput"
                type="password"
                placeholder=" Enter your password"
                name="password"
                ref={register({ required: true })}
              />
              {errors.password && (
                <p className="warning">Password is require</p>
              )}
            </Form.Group>
            <p style={{ color: 'red', fontSize: '20px' }}>{admin.loginError}</p>
            <Button
              variant="primary"
              className="styleinput"
              type="submit"
              style={{ paddingTop: '0' }}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => {
  const {} = state;
  return state;
};
const mapDispatchToProps = dispatch => ({
  onSubmit: adminInfo => dispatch(AdminPostFetch(adminInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(loginAdmin);
