import React, { Component } from "react";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
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
import MainDashboard from "./main-dashboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditMainMenu from "./edit-main-menu";
import LoginForm from "./login-form";
import auth from "../services/authService";
import { getUserInfo } from "../services/userService";
import Logout from "./logout";
import ProtectedRoute from "../common/protectedRoute";
import Statistics from "./statistics";
import DashboardNotFound from "./DashboardNotFound";
import EditPhoneBar from "./edit-phone-bar";
class Dashboard extends Component {

  state={
    companyName:"Fakfajzer",
    user:false
  };



 async componentDidMount() {
   const user = await auth.getCurrentUser();
   this.setState({ user });
   console.log("user id", user);
   await getUserInfo().then(({data})=>{
     this.setState({userName:data.name})
   }).catch(e=>{
     console.log("can't get user data")
   })

  }

  render() {
    return (
      <div>

        <div className="container-fluid">
          <div className="row">
            <div
              className="dashboard-main-nav">
            <Nav companyName={this.state.companyName}/>
            </div>
          </div>

          <div className="row">
          <LeftNav clasName="col-md-2 d-none d-md-block  sidebar"/>

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <h5>Logged as: {this.state.user ? this.state.userName: ""}</h5>
              </div>
              <Switch>
                <ProtectedRoute path="/dashboard/edit-content" component={EditContentStyle}/>
                <ProtectedRoute path="/dashboard/edit-colors" component={EditColors}/>
                <ProtectedRoute path="/dashboard/edit-text-styles" component={EditTextStyles}/>
                <ProtectedRoute path="/dashboard/edit-about" component={EditAbout}/>
                <ProtectedRoute path="/dashboard/edit-contact" component={EditContact}/>
                <ProtectedRoute path="/dashboard/edit-gallery" component={EditGallery}/>
                <ProtectedRoute path="/dashboard/edit-landing-page" component={EditLandingPage}/>
                <ProtectedRoute path="/dashboard/edit-offer" component={EditOffer}/>
                <ProtectedRoute path="/dashboard/edit-main-menu" component={EditMainMenu}/>
                <ProtectedRoute path="/dashboard/logout" component={Logout}/>
                <ProtectedRoute path="/dashboard/statistics" component={Statistics}/>
                <ProtectedRoute path="/dashboard/edit-phone-bar" component={EditPhoneBar}/>


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