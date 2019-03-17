import React, { Component } from "react";

class Contact extends Component {
  state={
    content:[],
    background:false
  };

  componentDidMount() {
    fetch(`${window.apiUri}/kontakt`)
      .then(res=>res.json())
      .then(contentArray=>{
        const content  = contentArray[0].block[0].content;
        const background = contentArray[0].background;
        this.setState({content,background})
      }).catch(error=>{
      this.setState({content: false})
    })
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
                case 'h1': return <h1 className="h1 text-center  mb-4 mt-4">{content.text}</h1>
                break;
                case 'h2': return <h2 className="h2 text-center ">{content.text}</h2>
                  break;
                case 'h3': return <h3 className="h3 text-center ">{content.text}</h3>
                  break;
                case 'h4': return <h4 className="h4 text-center ">{content.text}</h4>
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