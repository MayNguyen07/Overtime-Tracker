import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Row, Col, Nav, Navbar, Container } from 'react-bootstrap';
import RouteNames from './../../routes/index';
import OTRequestList from './../OTRequestList/index';
import AdminMembers from './../AdminMembers/index';
import './index.css';
function AdminHomePage() {
  return (
    <React.Fragment>
      <Nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
          OT Request
        </a>
        <ul className="navbar-nav px-3"></ul>
      </Nav>
      <Container fluid>
        <Row>
          <Nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-home"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    Dashboard <span className="sr-only">(current)</span>
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/admin/members">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-users"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    Members
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin/OT-Request">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-bar-chart-2"
                    >
                      <line x1="18" y1="20" x2="18" y2="10"></line>
                      <line x1="12" y1="20" x2="12" y2="4"></line>
                      <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    OT List Pending
                  </a>
                </li>
              </ul>
            </div>
          </Nav>

          <Col>
            <Row>
              <div className="wrapper">
                <Switch>
                  <Route
                    exact
                    path={RouteNames.REQUEST_LIST}
                    component={OTRequestList}
                  />
                  <Route
                    exact
                    path={RouteNames.ADMIN_MEMBERS}
                    component={AdminMembers}
                  />
                </Switch>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default AdminHomePage;
