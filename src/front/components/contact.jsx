import React, { Component } from "react";
import { getSubpage } from "../../services/subpageService";

class Contact extends Component {
  state={
    content:[],
    background:false
  };

  async componentDidMount() {
    const {data} = await getSubpage('kontakt');
    var content;
    if( data.length===0) content = false; //if can't fetch data set false to avoid error occur
    else content = data[0];
    this.setState({content:content.block[0].content,background:content.background});
  }
  render() {
    const style={
      minHeight:window.innerHeight-this.props.height,
      background: `url(${this.state.background})  no-repeat left center fixed `,


    }
    return (
      <div  className="container-fluid"  style={style}>
        <div className={"row"}>
          <div className="col-xl-4 col-lg-4  ">
          </div>
          <div className="col-xl-4 co-lg-4">
          {
           this.state.content ? this.state.content.map(content=>{
              switch (content.type){
                case 'h1': return <h1 key={content.text+Math.random()} className="h1 text-center  mb-4 mt-4">{content.text}</h1>
                break;
                case 'h2': return <h2 key={content.text+Math.random()} className="h2 text-center ">{content.text}</h2>
                  break;
                case 'h3': return <h3 key={content.text+Math.random()} className="h3 text-center ">{content.text}</h3>
                  break;
                case 'h4': return <h4 key={content.text+Math.random()} className="h4 text-center ">{content.text}</h4>
                  break;
              }
            }) : ''
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