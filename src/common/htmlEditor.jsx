import React, { Component } from "react";
import {Editor, EditorState, RichUtils} from 'draft-js';

class HtmlEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) =>{
      this.setState({editorState});
      console.log(this.state)
    }
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  _onBoldClick() {

    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  render() {
    return (
      <div style={{border: "1px solid #2222"}}>
        <button onClick={this._onBoldClick.bind(this)} className={"btn bg-info"}>B</button>
      <Editor

        editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange}
      />
      </div>
    );
  }
}

export default HtmlEditor;