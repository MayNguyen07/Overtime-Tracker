import './index.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import React, { useEffect } from 'react';
import './index.css';
import 'react-table/react-table.css';
import { useInjectSaga, useInjectReducer } from 'redux-injectors';
import saga from './saga';
import reducer from './reducer';
import { AppState } from 'reducers';
import { connect } from 'react-redux';
import { DataLoad, ToggleStatus, ToggleRole } from './action';
import { bindActionCreators } from 'redux';
import { ContainerState } from './types';
import {
  Navbar,
  Button,
  Dropdown,
  ButtonGroup,
  Row,
  Col,
} from 'react-bootstrap';
import { toggleRole } from './service';
import { Link } from 'react-router-dom';
import RouteNames from 'routes';
function AdminMembers(props) {
  const { DataLoad, state, ToggleStatus, ToggleRole } = props;

  const adminMember = state as ContainerState;

  let isInitialized = false;

  useEffect(() => {
    isInitialized = true;
    if (!adminMember.dataLoading && !adminMember.data) {
      DataLoad(null);
    }
  }, [isInitialized]);

  const key = 'adminMembers';
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });

  const data = adminMember.data
    ? adminMember.data.map((d, index) => {
        return {
          request: d,
          index: index + 1,
          name: d.name,
          email: d.email,
          role: d.role.name,
        };
      })
    : [];

  const handleToggleStatus = (id: string) => {
    ToggleStatus(id);
  };
  const handleToggleRole = (id: string) => {
    ToggleRole(id);
  };
  const columns = [
    {
      Header: 'Index',
      accessor: 'index',
      width: 70,
    },
    {
      Header: 'Fullname',
      accessor: 'name',
      width: 400,
    },
    {
      Header: 'Email',
      accessor: 'email',
      width: 300,
    },
    {
      Header: 'Role',
      accessor: 'role',
      width: 150,
    },

    {
      width: 300,
      Header: 'Actions',
      Cell: ({ original }) => (
        <div>
          {original.request.role_id !== 'admin' && (
            <button
              style={{ marginLeft: '25px' }}
              onClick={() => handleToggleRole(original.request.id)}
            >
              {original.request.role.id === 3 ? 'Upgrade' : 'Downgrade'}
            </button>
          )}

          <button
            style={{ marginLeft: '30px' }}
            onClick={() => handleToggleStatus(original.request.id)}
          >
            {original.request.active ? 'Disable' : 'Enable'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={15}
        className="striped -highlight "
      />

      <br />
    </React.Fragment>
  );
}

const mapStateToProps = (state: AppState) => {
  const { adminMember } = state;
  return {
    state: adminMember,
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators({ DataLoad, ToggleStatus, ToggleRole }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminMembers);
