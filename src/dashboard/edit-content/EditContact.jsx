import React, { Component } from "react";
import Form from "../../common/Form";
import Joi from "joi-browser";

class EditContact extends  Form {
  state = {
    pageId:false,
    data: {
      h4_1: "",
      h4_2: "",
      h4_3: "",
      h4_4: "",
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

  render() {
    return (
      <div>
        <h1>Edit Contact Page</h1>
      </div>
    );
  }
}

export default EditContact;