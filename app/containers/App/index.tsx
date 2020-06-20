/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteNames from 'routes';
import HomePage from 'containers/HomePage/Loadable';
import AdminLogin from './../AdminLogin/index';
import OTRequestList from './../OTRequestList/index';
import AdminMembers from './../AdminMembers/index';
import AdminHomePage from './../AdminHomepage/index';
import RequestForm from './../RequestForm/index';



function App() {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path={RouteNames.HOME_PAGE} component={HomePage} />
        <Route exact path ={RouteNames.ADMIN_LOGIN} component={AdminLogin} />
        <Route exact path ={RouteNames.REQUEST_LIST} component={AdminHomePage}/>
        <Route exact path ={RouteNames.ADMIN_MEMBERS} component={AdminHomePage}/>
        <Route exact path ={RouteNames.ADMIN_HOMEPAGE} component={AdminHomePage}/>
        <Route exact path ={RouteNames.REQUEST_FORM} component={RequestForm}/>
      </Switch>
     
    </div>
  );
}
export default hot(App);
