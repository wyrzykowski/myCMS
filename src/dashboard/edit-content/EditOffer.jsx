import React, { Component } from "react";
import ControlledEditor from '../../common/ControlledEditor'
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import FileButton from "../../common/FileButton";
import { getSubpage, saveSubpage } from "../../services/subpageService";
import { toast } from "react-toastify";
import { sendImage } from "../../services/imageService";


class EditOffer extends ControlledEditor {
  state={
    imageUri:"",
    imageFile:false,
    pageId:false
  }

  async componentDidMount() {
    await this.populateContent();
  }

  constructor(props) {
    const DBEditorState={"entityMap":{},"blocks":[{"key":"637gr","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
    super(props);
    this.state = {
      editorState,
    };

    if(process.env.imageUri){
      this.state.imageUri=process.env.imageUri;
    }else{
      this.state.imageUri="http://localhost:3008"
    }

    const editorState = EditorState.createWithContent(
      convertFromRaw(DBEditorState));



  }


  async populateContent() {
    const { data } = await getSubpage('oferta');
    //const jsonData = JSON.stringify(data[0].block[0].content);
    const editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(data[0].block)));//parse from string to object
    this.setState({editorState,pageId:data[0]._id})

  }
  sendImageToApi(){
    var fileData = this.state.imageFile;
    //here send file to API
    const url = "file/offer";

    const formData = { file: fileData }
    try {
      sendImage(url, formData);
    }catch(e){
      console.log(e)}
  }

  doSubmit = async () => {
    const dataToSave= {
      background:`${this.state.imageUri}/backgrounds/offer.jpg`,
      _id:this.state.pageId,
      block: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())),
    };
    this.refs.btn.setAttribute("disabled", "disabled"); //prevent mutiple time button press
    await saveSubpage(dataToSave,"oferta").then(()=>{
        toast.success("Content Updated!")
        this.refs.btn.removeAttribute("disabled");
      }


    ).catch((e)=>{
      this.refs.btn.removeAttribute("disabled");
    })
    this.refs.btn.removeAttribute("disabled");
    this.sendImageToApi()
  };

  renderButton(label) {
    return (
      <button  ref="btn"   className="btn btn-primary mb-4" onClick={this.doSubmit}>
        {label}
      </button>
    );
  }

  handleImage=(imageFile)=>{
    this.setState({imageFile})
  }


  render() {
    return (
      <div>
        <h1>Edit Offer Page</h1>
        <div style={{minHeight:"30vh",border:"solid 1px #DDD"}}>{this.renderControlledEditor()}</div>
        <FileButton onSelectImage={this.handleImage}  name="Backgorund Image:" label="Upload Image"/>
        <div>
          {this.renderButton("Save")}
        </div>
      </div>
    );
  }
}

export default EditOffer;