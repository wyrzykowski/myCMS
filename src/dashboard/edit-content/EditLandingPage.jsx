import Form from  './../../common/Form';
import React, { Component } from "react";
import Joi from "joi-browser";
import { getSubpage, saveSubpage } from "../../services/subpageService";
import { toast } from "react-toastify";
import { sendImage,deleteImage } from "../../services/imageService";

class EditLandingPage extends Form {
  state = {
    imagesFolder:"image",
    dataToSaveOnDisk:{
      newImages: [],
      deletedImages: [],

    },
    imageFiles: [],

    pageId:false,
    data: {
      images: false,

      someInfoLeftH1:"",
      someInfoLeftText:"",
      someInfoLeftLink:"",

      someInfoRightH1:"",
      someInfoRightText:"",
      someInfoRightLink:"",
    },
    errors: {}
  };
  schema = {
    images: Joi.any(),
    someInfoLeftH1: Joi.string().required(),
    someInfoLeftText: Joi.string(),
    someInfoLeftLink: Joi.string(),
    someInfoRightH1: Joi.string().required(),
    someInfoRightText: Joi.string(),
    someInfoRightLink: Joi.string(),
  };

  constructor(){
    super();
    if(process.env.imageUri){
      this.state.imageUri=process.env.imageUri;
    }else{
      this.state.imageUri="http://localhost:3008"
    }
  }

  componentDidMount() {
    this.populateContent();
  }

  async populateContent(){
    const {data} = await getSubpage('home');
    if(data.length!==0){
      const Newdata = {
        images: data[0].block[0].content,
        someInfoLeftH1: data[0].block[1].content[0].h1,
        someInfoLeftText: data[0].block[1].content[0].text,
        someInfoLeftLink: data[0].block[1].content[0].link,


        someInfoRightH1: data[0].block[1].content[1].h1,
        someInfoRightText: data[0].block[1].content[1].text,
        someInfoRightLink: data[0].block[1].content[1].link,
      };

      this.setState({data:(Newdata),pageId:data[0]._id});
      console.log("New data is: ",this.state.data);
    }
  }

  sendImageToApi(){
    var finished=0;

    this.state.dataToSaveOnDisk.newImages.map((file)=>{
      console.log(file.fileName);
      //Save new files using API
      const url=`files/${file.fileName}`;
      const formData = { file: file.fileData };
      try {
        sendImage(url, formData,()=>{
          //Clear arrays and show actual images state
          const newImages=[];
          const dataToSaveOnDisk = {...this.state.dataToSaveOnDisk,newImages};
          this.setState({dataToSaveOnDisk,imageFiles:newImages});
          this.populateContent();
        });
      }catch(e){
        console.log(e)}
    })
  }

  deleteImageFromApi() {
    // DELETE IMAGE
    this.state.dataToSaveOnDisk.deletedImages.map(file => {
      const url = `files/${file.text}`;
      const someData = null;
      try {
        deleteImage(url, someData,()=>{
          //If image successfully deleted clear file to delete state
          const deletedImages=[];
          const dataToSaveOnDisk = {...this.state.dataToSaveOnDisk,deletedImages};
          this.setState({dataToSaveOnDisk});
        })
      } catch (e) {
        console.log(e)
      }
    })
  }


  doSubmit = async () => {


    const newImages = this.state.imageFiles.map(image=>{
      return {
        type: "img",
        text: image.filePath
      }
    });
    var allImage;
    if(this.state.data.images)allImage =[...newImages,...this.state.data.images];

    const dataToSave= {
      _id:this.state.pageId,
      block: [
        {
          name:"gallery",
          h1: this.state.data.h1,
          content: allImage
        },
        {
          name: "someinfo",
          content : [
            {
              h1 : this.state.data.someInfoLeftH1,
              text : this.state.data.someInfoLeftText,
              link : this.state.data.someInfoLeftLink
            },
            {
              h1 : this.state.data.someInfoRightH1,
              text : this.state.data.someInfoRightText,
              link : this.state.data.someInfoRightLink
            }
            ]
        }
      ],
    }

    this.refs.btn.setAttribute("disabled", "disabled"); //prevent mutiple time button press
    await saveSubpage(dataToSave,"home").then(
      toast.success("Content Updated!")
    )

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

    //to display imges which are not loaded yet
    setTimeout(()=>{ this.forceUpdate();},5000)

  };





  render() {
    return (
      <div>
        <h1>Edit Landing Page</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderFilesButton("Upload images:","Upload Images","Manage slides:")}
          <hr/>
          <h1 className={"h4"}> Some info component</h1>
          <br/>
          <h4> Left</h4>
          { this.renderInput("someInfoLeftH1","Header - Some Info Left","text")}
          { this.renderInput("someInfoLeftLink","Link - Some Info Left","text")}
          { this.renderTextarea("someInfoLeftText","Content - Some Info Left","text")}
          <br/>
          <h4> Right </h4>
          { this.renderInput("someInfoRightH1","Header - Some Info Right","text")}
          { this.renderInput("someInfoRightLink","Link - Some Info Right","text")}
          { this.renderTextarea("someInfoRightText","Content - Some Info Right","text")}

          {this.renderButton("Save")}

        </form>
      </div>
    );
  }
}

export default EditLandingPage;