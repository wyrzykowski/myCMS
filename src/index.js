import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch,Route} from 'react-router-dom';
import App from './App';
import Dashboard from './dashboard/dashboard'

import * as serviceWorker from './serviceWorker';
window.apiUri="http://localhost:3001/fakfajzer";//set Api Uri to be global and accessible by windows object
ReactDOM.render(

  <BrowserRouter>
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" component={App} />

    </Switch>
  </BrowserRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
