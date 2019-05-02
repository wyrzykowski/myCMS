import Form from  './../../common/Form';
import React, { Component } from "react";
import Joi from "joi-browser";
import { getSubpage, saveSubpage } from "../../services/subpageService";
import { toast } from "react-toastify";
import { sendImage,deleteImage } from "../../services/imageService";

class EditGallery extends Form {
  constructor(){
    super();
    if(process.env.imageUri){
      this.state.imageUri=process.env.imageUri;
    }else{
      this.state.imageUri="http://localhost:3008"
    }
  }

  state = {
    imageUri:"",
    imagesFolder:"img",
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
    var finished=0;

    this.state.dataToSaveOnDisk.newImages.map((file)=>{
      //Save new files using API
      const url=`files/${file.fileName}`
      const formData = { file: file.fileData }
      try {
        sendImage(url, formData,()=>{
          //Clear arrays and show actual images state
          const newImages=[]
          const dataToSaveOnDisk = {...this.state.dataToSaveOnDisk,newImages}
          this.setState({dataToSaveOnDisk,imageFiles:newImages})
          this.populateContent();
        });
      }catch(e){
        console.log(e)}
    })
  }

  deleteImageFromApi() {
    // DELETE IMAGE FROM MEDIA API
    this.state.dataToSaveOnDisk.deletedImages.map(file => {
      const url = `files/${file.text}`
      const someData = null;
      try {
        deleteImage(url, someData,()=>{
          //If image successfully deleted clear file to delete state
          const deletedImages=[]
          const dataToSaveOnDisk = {...this.state.dataToSaveOnDisk,deletedImages}
          this.setState({dataToSaveOnDisk})
        })
      } catch (e) {
        console.log(e)
      }
    })
  }


  doSubmit = async () => {
    //Send image to content API(database)
    const newImages = this.state.imageFiles.map(image=>{
    return {
      type: "img",
      text: image.filePath
    }
    });
    var allImage;
    if(this.state.data.images) allImage =[...newImages,...this.state.data.images];


    const dataToSave= {
      _id:this.state.pageId,
      block: [
        {
          name:"gallery",
          h1: this.state.data.h1,
          content: allImage
        }
      ]

    };

    this.refs.btn.setAttribute("disabled", "disabled"); //prevent mutiple time button press
    await saveSubpage(dataToSave,"gallery").then(
      toast.success("Content Updated!")
    );

    this.refs.btn.removeAttribute("disabled");
    // this.props.history.push("/edit-page");


   //Save image which should be save to disk

    //Create object with File data and file Name
    var imagesToSaveOnDisk = this.state.imageFiles.map((image,index)=>{

      return {
        fileName: image.fileName,
        fileData: this.state.imageFiles[index].content
      }
    })

    let dataToSaveOnDisk = this.state.dataToSaveOnDisk;
    dataToSaveOnDisk = {...dataToSaveOnDisk,newImages:imagesToSaveOnDisk}
    this.setState({dataToSaveOnDisk})
    //Save only New Images to Disk using API:
    this.sendImageToApi();
    this.deleteImageFromApi();
    setTimeout(()=>{ this.forceUpdate();},5000)
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