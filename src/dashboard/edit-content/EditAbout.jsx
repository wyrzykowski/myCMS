import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./../../common/Form"
import { getSubpage, saveSubpage } from "../../services/subpageService";
import { toast } from "react-toastify";
class EditAbout extends Form {
  state = {
    pageId:false,
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
  const {data} = await getSubpage('onas');
  console.log("data",data[0].block[0].content[0].text)
  var content;
  if( data.length===0) content = false; //if can't fetch data set false to avoid error occur
  else content = data[0];
  const Newdata ={
    h1: content.block[0].content[0].text,
    p: content.block[0].content[1].text
  }
  this.setState({data:Newdata,pageId:content._id});
}

async componentDidMount() {
  await this.populateContent();
}

  doSubmit = async () => {
console.log(this.state.pageId)
  const dataToSave= {
    _id:this.state.pageId,
    block: [
      {
        name: "text",
        content: [
          {
            type: "h1",
            text: this.state.data.h1
          },
          {
            type: "p",
            text: this.state.data.p
          }
        ]

      }
    ]
  }
    this.refs.btn.setAttribute("disabled", "disabled"); //prevent mutiple time button press
    await saveSubpage(dataToSave,"onas").then(
      toast.success("Content Updated!")
    )

    this.refs.btn.removeAttribute("disabled");
   // this.props.history.push("/edit-page");
  };
  onFileButtonChange(e){

    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e)=>{
      //here send file to API
      console.warn("img data", e.target.result)
    }
  }
  render() {
    return (
      <div>
        <h1>Edit About Page</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("h1", "Header")}
          {this.renderTextarea("p", "Content")}
          {this.renderFileButton("Backgorund Image:","Upload Image")}
          {this.renderButton("Save")}
        </form>

      </div>
    );
  }
}

export default EditAbout;