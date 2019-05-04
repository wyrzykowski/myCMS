import React, { Component } from "react";
import Form from  './../common/Form';
import Joi from "joi-browser";
import { getSubpage, saveSubpage } from "../services/subpageService";
import { toast } from "react-toastify";
import { convertFromRaw, EditorState } from "draft-js";






class EditPhoneBar extends Form {

  state = {
    pageId:false,
    data: {
      phoneBar: "",
    },
    errors: {}
  };
  schema = {
    phoneBar: Joi.any(),
  };
  async componentDidMount(){
    await this.getPhoneBar();
  }

  async getPhoneBar() {
    try {
      //Get main menu name
      const { data } = await getSubpage('phone_bar');

      const pageId = data[0]._id;
      const content = data[0].block[0].content;
      this.setState({
        data: {
          ...this.state.data,
          phoneBar: content,
        }, pageId
      })
    }catch(e){
      toast.error("Cant't load phone bar data")
    }}


  doSubmit = async () => {

    const dataToSave = {
      _id: this.state.pageId,
      block: [{
      content:  this.state.data.phoneBar
  }]
    };

    await saveSubpage(dataToSave,"phone_bar").then( (res)=>{
      toast.success("Content Updated!")
      console.log(res)
    }).catch(e=>{
      console.log("error")
    })
  };



  render() {
    console.log("schema",this.state.data.phoneBar);

    return (
      <div>
        <h1>Edit main Menu</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("phoneBar","Phone Bar content:")}
          {this.renderButton("Save")}
        </form>
      </div>


    );
  }
}

export default EditPhoneBar;