import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import Spinner from '../../Component/UI/Spinner';
import './index.css';

import 'react-datepicker/dist/react-datepicker.css';
import { getValueAction, getUserInformation } from './actions';
import { bindActionCreators } from 'redux';
import { useInjectSaga, useInjectReducer } from 'redux-injectors';
import reducer from './reducer';
import saga from './saga';
import { ContainerState } from './types';
import { AppState } from 'reducers';
import HeaderComponent from '../../Component/HeaderComponent/HeaderComponent';
import { Button, Modal, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const key = 'form';

// const animatedComponents = makeAnimated();

function RequestForm(props) {
  const { getValueAction, getUserInformation, state } = props;
  const userState = state as ContainerState;

  const [inputValue, setInputValue] = useState('');
  const [timeFrom, setTimeFrom] = useState(new Date());
  const [timeTo, setTimeTo] = useState(new Date());
  const [creator, setCreator] = useState();
  const [members, setMembers] = useState();
  const [approver, setApprover] = useState();
  const { register, handleSubmit, errors } = useForm();

  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    getUserInformation(token);
  }, []);

  // const options = userState.data.map(d => [{ value: d.name, label: d.name }]);
  const options = [
    { value: 'Tran Nhat Thien', label: 'Tran Nhat Thien' },
    { value: 'Vo Duy Nghia', label: 'Vo Duy Nghia' },
    { value: 'Aoi Kurokawa', label: 'Aoi Kurokawa' },
    { value: 'Hoang Pham', label: 'Hoang Pham' },
    { value: 'Le Thi Dung', label: 'Le Thi Dung' },
  ];

  // console.log(options);

  const inputChangedHandler = event => {
    setInputValue(event.target.value);
  };

  useEffect(() => {}, creator);

  const onChangeMembers = members => {
    const tmpMembers = members.map(mem => mem.value);
    setMembers(tmpMembers);
  };

  const onChangeApprover = approver => {
    const tmpApprover = approver.map(app => app.value);
    setApprover(tmpApprover);
  };

  const onChangeTimeFrom = time => {
    setTimeFrom(time);
  };

  const onChangeTimeTo = time => {
    setTimeTo(time);
  };

  const onSubmit = data => {
    const dataCustom = {
      creator: creator,
      members: members,
      startTime: moment(timeFrom).format('YYYY-MM-DD HH:mm'),
      endTime: moment(timeTo).format('YYYY-MM-DD HH:mm'),
      approver: approver,
      reason: data.reason,
    };

    getValueAction(dataCustom, token);
  };

  let userInformation = <Spinner />;

  if (!userState.loading) {
    userInformation = (
      <React.Fragment>
        <HeaderComponent />
        <div className="main">
          <div className="container">
            <form className="request-form" onSubmit={handleSubmit(onSubmit)}>
              <h2>Employee request OT form</h2>
              <div className="form-group">
                <div className="Input">
                  <label className="label">Creator:</label>
                  <input
                    className="form-control"
                    name="creator"
                    disabled
                    value="Hoang Pham"
                  />
                  {errors.creator?.type === 'required' &&
                    'Your input is required'}
                </div>
              </div>
              <div className="Input">
                <label className="label">Members</label>
                <Select
                  closeMenuOnsSelect={false}
                  isMulti
                  options={options}
                  ref={register({
                    name: 'members',
                    required: true,
                  })}
                  onChange={onChangeMembers}
                />
                {errors.member?.type === 'required' && 'Your input is required'}
              </div>
              <Row className="row justify-content-around">
                <div className="form-row">
                  <Col>
                    <div className="form-group">
                      {' '}
                      <div className=" Col Input">
                        <label className="label">From :</label>
                        <div>
                          <DatePicker
                            selected={timeFrom}
                            onChange={onChangeTimeFrom}
                            showTimeSelect
                            ref={register({
                              name: 'startTime',
                              required: true,
                            })}
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="yyyy/M/dd   h:mm aa"
                            className="dateFrom"
                          />
                          {errors.from && <p>{errors.from.message}</p>}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="form-group">
                      <div className="Input">
                        <label className="label">To:</label>
                        <div>
                          <DatePicker
                            selected={timeTo}
                            onChange={onChangeTimeTo}
                            showTimeSelect
                            ref={register({
                              name: 'endTime',
                              required: true,
                            })}
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="yyyy/M/dd h:mm aa"
                            className="dateTo"
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </div>
              </Row>
              <div className=" Input">
                <label className="label">Approver:</label>
                <Select
                  closeMenuOnsSelect={false}
                  isMulti
                  options={options}
                  ref={register({
                    name: 'members',
                    required: true,
                  })}
                  onChange={onChangeApprover}
                />
                {errors.approver?.type === 'required' &&
                  'Your input is required'}
              </div>
              <div className="Input">
                <label className="label">Reason:</label>
                <textarea
                  className="textarea"
                  name="reason"
                  ref={register({
                    required: true,
                  })}
                  onChange={inputChangedHandler}
                />
                {errors.reason?.type === 'required' && 'Your input is required'}
              </div>
              <div className="Button">
                {/* <button type="submit" className="SubmitButton" href="/">
                  Submit
                </button> */}
                <Link to="/">
                  <button type="submit">Submit</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return <div>{userInformation}</div>;
}

const mapStateToProps = (state: AppState) => {
  const { form } = state;
  return {
    state: form,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getValueAction, getUserInformation }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
