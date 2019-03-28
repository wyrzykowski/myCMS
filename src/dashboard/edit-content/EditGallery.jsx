import Form from  './../../common/Form';
import React, { Component } from "react";
import Joi from "joi-browser";
import { getSubpage } from "../../services/subpageService";

class EditGallery extends Form {
  state = {
    imageFiles: [],
    pageId:false,
    data: {
      h1: false,
      images: false
    },
    errors: {}
  };
  schema = {
    h1: Joi.string()
      .required()
      .label("Header"),
    p: Joi.string()
      .label("Content"),
  };

  componentDidMount() {
    this.populateContent();
  }

  async populateContent(){
    const {data} = await getSubpage('gallery');
    if(data.length!==0){
      const Newdata = {
        h1: data[0].block[0].h1,
        images: data[0].block[0].content

      }
      this.setState({data:(Newdata)});
    }
  }



  render() {
    return (
      <div>
        <h1>Edit Gallery Page</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("h1","Header")}
          {this.renderFilesButton("Upload images:","Upload Images")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default EditGallery;