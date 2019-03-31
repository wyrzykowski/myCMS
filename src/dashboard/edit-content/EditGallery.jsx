import Form from  './../../common/Form';
import React, { Component } from "react";
import Joi from "joi-browser";
import { getSubpage, saveSubpage } from "../../services/subpageService";
import { toast } from "react-toastify";
import { sendImage } from "../../services/imageService";

class EditGallery extends Form {
  state = {
    dataToSaveOnDisk:{
      newImages: [],
      deletedImages: []
    },
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

      this.setState({data:(Newdata),pageId:data[0]._id});
    }
  }

  sendImageToApi(){
    console.log("DATA",this.state.dataToSaveOnDisk)
    this.state.dataToSaveOnDisk.newImages.map((file)=>{
      //Save new files using API
      const url=`files/${file.fileName}`
      const formData = { file: file.fileData }
      console.log("formData",file.Data)
      try {
        sendImage(url, formData);
      }catch(e){
        console.log(e)}
    })


    //delete files
    this.state.dataToSaveOnDisk.deletedImages.map(file=>{
      const url=`files/${file}`
      console.log("formData DELETE",file)
    })



  }



  doSubmit = async () => {


    const newImages = this.state.imageFiles.map(image=>{
    return {
      type: "img",
      text: image.fileName
    }
    })
    var allImage;
    if(this.state.data.images)allImage =[...newImages,...this.state.data.images];

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


   //Save image which should be save to disk

    //Create object with File data and file Name
    var imagesToSaveOnDisk = newImages.map((image,index)=>{
      return {
        fileName: image.text,
        fileData: this.state.imageFiles[index].content
      }
    })

    let dataToSaveOnDisk = this.state.dataToSaveOnDisk;
    dataToSaveOnDisk = {...dataToSaveOnDisk,newImages:imagesToSaveOnDisk}
    console.log("data to save on disk new", dataToSaveOnDisk)
    this.setState({dataToSaveOnDisk})
    //Save only New Images to Disk using API:
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