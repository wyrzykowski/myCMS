import React, { Component } from "react";
import { getSubpage } from "../../services/subpageService";

import draftToHtml from "draftjs-to-html";
import { ContentState, convertFromRaw, convertToRaw, EditorState } from "draft-js";

class Contact extends Component {
  state={
    content:[],
    background:false
  };

  async componentDidMount() {
    const {data} = await getSubpage('kontakt');
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
    const style={
      minHeight:window.innerHeight-this.props.height,
      background: `url(${this.state.background})  no-repeat left center fixed `,
      backgroundSize:"cover",
      backgroundRepeat:"no-repeat"
    };
    return (
      <div  className="container-fluid"  style={style}>
        <div className={"row"}>
          <div className="col-xl-4 col-lg-4  ">
          </div>
          <div className="col-xl-4 co-lg-4">
          {
            !this.state.content ?  " aa" :
              <div   className="container-fluid"   style={style}>
                <div className="row" id="offer" >

                  <div className="col-md-6 col-lg-7 col-xl-7 col-sm-12">
                  </div>
                  <div dangerouslySetInnerHTML={{__html:  draftToHtml(this.state.content) }} />
                </div>

              </div>
          }
          </div>
          <div className="col-xl-4 col-lg-4  ">
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;