import React, { Component } from "react";
import { getSubpage } from "../../services/subpageService";

class About extends Component {
state={
  content:false,
  background:false
};
async componentDidMount() {
  const {data} = await getSubpage('onas');
  var content;
  if( data.length===0) content = false; //if can't fetch data set false to avoid error occur
  else content = data[0];
  this.setState({content:content.block[0].content,background:content.background});

}

  render() {
const style={
  backgroundImage: `url(${this.state.background})`,
  minHeight:window.innerHeight-this.props.height
}
    return (
      <div className="container-fluid"   style={style}>
        <div className="row" >
            {
              this.state.content ? this.state.content.map(content =>
                {
                  switch(content.type) {
                    case 'h1':
                      return <div key={Math.random()+content.text}className="col-sm-12 h1 mt-3"><h1 >{content.text}</h1></div>;
                    case 'p':
                      return <div key={Math.random()+content.text} className='col-xl-6 col-md-12 h5'><p key={Math.random()}>{content.text}</p></div>;
                    default:
                      return '';
                  }
                }
              ): ''
            }

        </div>
      </div>
    );
  }
}

export default About;