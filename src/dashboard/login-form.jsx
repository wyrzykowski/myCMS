import Form from  './../common/Form';
import React, { Component } from "react";
import Joi from "joi-browser";
import {login} from "./../services/authService"
import { ToastContainer, toast } from 'react-toastify';
class LoginForm extends Form {
  state = {
    data: {
      login:"",
      password:"",
    },
    errors: {}
  };
  schema = {

    login: Joi.string().required(),
    password :Joi.string().required(),

  };


  doSubmit = async () => {

     const email = this.state.data.login;
     const password =this.state.data.password;


    login(email,password).then( (resData)=>{
      // localStorage.setItem("token",loginData.data.token);
      // console.log(loginData.data.token)
        this.props.history.push("/dashboard/statistics");
        toast.success("Welcome to Dashboard!")
    }).catch( e=>{
      console.log(e);
      }
    );
  };



  render() {
    return (
      <div className={"login-form-body"}>
      <div className={"login-form-container"}>
        <h1 className={"login-form-h1"}>Login to Dashboard</h1>
        <form onSubmit={this.handleSubmit}>
          { this.renderInput("login","Login","text")}
          { this.renderInput("password","password","password")}
          <div className={"login-form-button"}>{this.renderButton("Login")}</div>
        </form>
      </div>
        <ToastContainer/>
      </div>
    );
  }
}

export default LoginForm;