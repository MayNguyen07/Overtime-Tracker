import React, { useEffect, useState } from 'react';
import './index.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { useInjectSaga, useInjectReducer } from 'redux-injectors';
import saga from './saga';
import reducer from './reducer';
import { AppState } from 'reducers';
import { connect } from 'react-redux';
import { DataLoad, AcceptRequest, DenyRequest } from './action';
import { bindActionCreators } from 'redux';
import { ContainerState } from './types';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RouteNames from 'routes';
import { useForm } from 'react-hook-form';

function pad(n: number, width: number, z: string = '0') {
  z = z || '0';
  let s = String(n);
  return s.length >= width ? s : new Array(width - s.length + 1).join(z) + s;
}

function OTRequestList(props) {
  const { DataLoad, AcceptRequest, DenyRequest, otRequestAdmin } = props;
  const { register, handleSubmit, errors } = useForm();
  const [show, setShow] = useState(false);
  const [modalRequestId, setModalRequestId] = useState('');
  const handleClose = () => setShow(false);
  const showDenyModal = (requestID: string) => {
    setModalRequestId(requestID);
    setShow(true);
  };

  let isInitialized = false;

  useEffect(() => {
    isInitialized = true;
    DataLoad();
  }, [isInitialized]);

  const key = 'requestLogin';
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });

  const data = otRequestAdmin.data
    ? otRequestAdmin.data.map((d, index) => {
        const from = new Date(Date.parse(d.from));
        const to = new Date(Date.parse(d.to));

        return {
          otRequest: d,
          index: index + 1,
          creator: d.creator.name,
          member: d.member_ids.map(m => m.name || m.id).join(', '),
          from: d.from,
          to: d.to,
          hours: d.hour,
          approver: d.approver.name,
          reason: d.reason,
        };
      })
    : [];

  const handleClickAccept = (isAccepted, id) => {
    AcceptRequest(isAccepted, id);
  };
  const onModalSubmit = data => {
    handleClose();
    DenyRequest(data.reason, modalRequestId);
  };

  const columns = [
    {
      Header: 'No',
      accessor: 'index',
      width: 40,
    },
    {
      Header: 'Creator',
      accessor: 'creator',
      width: 120,
    },
    {
      Header: 'Member',
      accessor: 'member',
      width: 200,
    },
    {
      Header: 'From',
      accessor: 'from',
      width: 150,
    },
    {
      Header: 'To',
      accessor: 'to',
      width: 150,
    },
    {
      Header: 'Hours',
      accessor: 'hours',
      width: 50,
    },

    {
      Header: 'Approver',
      accessor: 'approver',
      width: 150,
    },
    {
      Header: 'Reason',
      accessor: 'reason',
      width: 300,
    },
    {
      width: 200,
      Header: 'Actions',

      Cell: ({ original }) => (
        <div>
          {(original.otRequest.status === 0 ||
            original.otRequest.status === 2) && (
            <button
              style={{ marginLeft: '25px' }}
              onClick={() => handleClickAccept(true, original.otRequest.id)}
            >
              Accept
            </button>
          )}
          {(original.otRequest.status === 0 ||
            original.otRequest.status === 1) && (
            <button
              style={{ marginLeft: '30px' }}
              onClick={() => showDenyModal(original.otRequest.id)}
            >
              Deny
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={10}
        className="striped -highlight"
      />

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit(onModalSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Why do you reject the request?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{ fontSize: '20px' }}>
                Please text here
              </Form.Label>
              <textarea
                name="reason"
                ref={register({ required: true, maxLength: 300 })}
                style={{ height: '100px', width: '450px' }}
              />
              {errors.reason && errors.reason.type === 'required' && (
                <span>This is required</span>
              )}
              {errors.reason && errors.reason.type === 'maxLength' && (
                <span>Max length exceeded</span>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <br />
    </div>
  );
}

const mapStateToProps = (state: AppState) => {
  const { otRequestAdmin } = state;
  return {
    otRequestAdmin,
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ DataLoad, AcceptRequest, DenyRequest }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OTRequestList);
