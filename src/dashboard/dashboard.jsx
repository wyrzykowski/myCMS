import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Nav from './nav'
import EditContent from './edit-content'
import LeftNav from './left-nav'
import EditTextStyles from './edit-text-styles';
import EditColors from './edit-colors';
import App from "../App";
class Dashboard extends Component {

  state={
    companyName:"Fakfajzer",
    contents:[]
  }

  componentDidMount() {

const contents = [
  'Strona główna',
  'O nas',
  'Galeria',
  'Oferta',
  'Kontakt'
]
    this.setState({contents})
  }

  render() {
    return (
      <div>

        <Nav companyName={this.state.companyName}/>
        <div className="container-fluid mt-5">
          <div className="row">
          <LeftNav clasName="col-md-2 d-none d-md-block  sidebar"/>

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
              </div>

              <Switch>
                <Route path="/dashboard/edit-content" component={EditContent}/>
                <Route path="/dashboard/edit-colors" component={EditColors}/>
                <Route path="/dashboard/edit-text-styles" component={EditTextStyles}/>
              </Switch>

            </main>
          </div>
        </div>



      </div>

    );
  }
}

export default Dashboard;