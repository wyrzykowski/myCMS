import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./../../common/Form"
class EditAbout extends Form {
  state = {
    data: {
      h1: "",
      p: ""
    },
    genres: [],
    errors: {}
  };
  schema = {
    h1: Joi.string()
      .required()
      .label("Header"),
    p: Joi.string()
      .label("Content"),
  };
async populateContent(){
  const h1 = "Oferta";
  const p = "super "
}
  render() {
    return (
      <div>
        <h1>Edit About Page</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("h1", "Header")}
          {this.renderInput("p", "Content")}
          {this.renderButton("Save")}
        </form>

      </div>
    );
  }
}

export default EditAbout;