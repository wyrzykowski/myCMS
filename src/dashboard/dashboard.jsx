import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Nav from './nav'
import EditContentStyle from './edit-content.-style'
import LeftNav from './left-nav'
import EditTextStyles from './edit-text-styles';
import EditColors from './edit-colors';
import App from "../App";
import EditAbout from "./edit-content/EditAbout";
import EditContact from "./edit-content/EditContact";
import EditGallery from "./edit-content/EditGallery";
import EditLandingPage from "./edit-content/EditLandingPage";
import EditOffer from "./edit-content/EditOffer";
import MainSettings from "./main-settings";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                <Route path="/dashboard/edit-content" component={EditContentStyle}/>
                <Route path="/dashboard/edit-colors" component={EditColors}/>
                <Route path="/dashboard/edit-text-styles" component={EditTextStyles}/>
                <Route path="/dashboard/edit-about" component={EditAbout}/>
                <Route path="/dashboard/edit-contact" component={EditContact}/>
                <Route path="/dashboard/edit-gallery" component={EditGallery}/>
                <Route path="/dashboard/edit-landing-page" component={EditLandingPage}/>
                <Route path="/dashboard/edit-offer" component={EditOffer}/>
                <Route path="/dashboard/main-settings" component={MainSettings}/>
              </Switch>

            </main>
          </div>

        </div>


<ToastContainer/>
      </div>

    );
  }
}

export default Dashboard;