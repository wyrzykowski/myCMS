import React, { Component } from "react";
import { getSubpage } from "../../services/subpageService";
import draftToHtml from "draftjs-to-html";

class About extends Component {
state={
  content:false,
  background:false
};
async componentDidMount() {
  const {data} = await getSubpage('onas');
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
  backgroundImage: `url(${this.state.background})`,
  minHeight:window.innerHeight-this.props.height,
  backgroundSize:"cover",
  backgroundRepeat:"no-repeat"
};
    return (
      <div className="container-fluid" style={style}>

        <div className="row" id="about" >
          {!this.state.content ? "" :
            <div className="col-md-6 col-lg-7 col-xl-7 col-sm-12 h5" dangerouslySetInnerHTML={{ __html: draftToHtml(this.state.content) }}/>
          }
          <div className="col-md-6 col-lg-7 col-xl-7 col-sm-12">
          </div>
        </div>

      </div>
    );
  }
}

export default About;