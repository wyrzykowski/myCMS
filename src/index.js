import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import App from './App';
import Dashboard from './dashboard/dashboard'
import ProtectedRoute from './common/protectedRoute'
import remotestyle from './css/remotestyle.css'
import * as serviceWorker from './serviceWorker';
import LoginForm from "./dashboard/login-form";
import Statistics from "./dashboard/statistics";


window.apiUri="http://localhost:3001/fakfajzer";//set Api Uri to be global and accessible by windows object

ReactDOM.render(
<div>

  <BrowserRouter>

    <Switch>
      <Route path="/login" component={LoginForm}/>
      <Redirect exact from="/dashboard" to="/dashboard/statistics"/>
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <Route path="/" component={App} />
    </Switch>

  </BrowserRouter>
</div>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
