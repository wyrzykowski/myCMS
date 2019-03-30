import Form from  './../../common/Form';
import React, { Component } from "react";
import Joi from "joi-browser";
import { getSubpage, saveSubpage } from "../../services/subpageService";
import { toast } from "react-toastify";

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
      .label("Header"),
    images: Joi.any()

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


  doSubmit = async () => {
    const newImages = this.state.imageFiles.map(image=>{
    return {
      type: "img",
      text: image.fileName
    }
    })
    const allImage =[...newImages,...this.state.data.images];
    console.log("all image",allImage);


    const dataToSave= {
      _id:this.state.pageId,
      block: [
        {
          name:"gallery",
          h1: this.state.data.h1,
          content: allImage
        }
      ]

    }

    console.log("tosavr",dataToSave)
    this.refs.btn.setAttribute("disabled", "disabled"); //prevent mutiple time button press
    await saveSubpage(dataToSave,"gallery").then(
      toast.success("Content Updated!")
    )

    this.refs.btn.removeAttribute("disabled");
    // this.props.history.push("/edit-page");
    this.sendImageToApi();
  };





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