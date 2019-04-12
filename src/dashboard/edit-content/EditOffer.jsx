import React, { Component } from "react";
import HtmlEditor from "../../common/htmlEditor";
import ControlledEditor from '../../common/ControlledEditor'
import { ContentState, convertFromRaw, convertToRaw, EditorState } from "draft-js";
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from "draftjs-to-html";
import { getSubpage, saveSubpage } from "../../services/subpageService";
import { toast } from "react-toastify";
import Form from "./../../common/Form";

class EditOffer extends ControlledEditor {
state={
  imageFile:false,
  pageId:false
}

  async componentDidMount() {
    await this.populateContent();
  }

  constructor(props) {
    const DBEditorState={"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
    super(props);
    const editorState = EditorState.createWithContent(
      convertFromRaw(DBEditorState));

    this.state = {
      editorState,

    };

  }


  async populateContent() {

    const { data } = await getSubpage('oferta');
    //const jsonData = JSON.stringify(data[0].block[0].content);
    const DBEditorState={"entityMap":{},"blocks":[{"key":"637gr","text":"NEW Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
    const editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(data[0].block)));//parse from string to object
     this.setState({editorState,pageId:data[0]._id})

  }

  doSubmit = async () => {
    const dataToSave= {
      _id:this.state.pageId,
      block: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())),
    }
    console.log("DATA TO DAVE",dataToSave)
    this.refs.btn.setAttribute("disabled", "disabled"); //prevent mutiple time button press
    await saveSubpage(dataToSave,"oferta").then(()=>{
      toast.success("Content Updated!")
      this.refs.btn.removeAttribute("disabled");
    }


    ).catch((e)=>{
      this.refs.btn.removeAttribute("disabled");
    })
    this.refs.btn.removeAttribute("disabled");

  };

  renderButton(label) {
    return (
      <button  ref="btn"   className="btn btn-primary mb-4" onClick={this.doSubmit}>
        {label}
      </button>
    );
  }

  render() {
    console.log("tu",JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent())))
    return (
      <div>
        <h1>Edit Offer Page</h1>
        <div>{this.renderControlledEditor()}</div>
        <div dangerouslySetInnerHTML={{__html:  draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) }} />
        <div>
          {this.renderButton("Save")}
        </div>
      </div>
    );
  }
}

export default EditOffer;