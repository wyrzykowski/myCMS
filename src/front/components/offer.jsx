import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getSubpage } from "../../services/subpageService";

import draftToHtml from "draftjs-to-html";
import { ContentState, convertFromRaw, convertToRaw, EditorState } from "draft-js";

class Offer extends Component {
  state={
    content:false,
    background: false
  };
  async componentDidMount() {
    const {data} = await getSubpage('oferta');
    let content;
    let textContent;
    if( data.length===0) content = false; //if can't fetch data set false to avoid error occur
    else {
      textContent = JSON.parse(data[0].block);
      content =data[0];

    }
    this.setState({content:textContent,background:content.background});
  }

  render() {
    console.log(this.state.content)
    const style={
      backgroundImage: `url(${this.state.background})`,
      minHeight:window.innerHeight-this.props.height,

    }

    return (
      !this.state.content ?  " aa" :
      <div   className="container-fluid"   style={style}>
        <div className="row" id="offer" >

        <div className="col-md-6 col-lg-7 col-xl-7 col-sm-12">
        </div>
          <div dangerouslySetInnerHTML={{__html:  draftToHtml(this.state.content) }} />
        </div>

      </div>
    );
  }
}

export default Offer;