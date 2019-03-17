import React, { Component } from "react";

class About extends Component {
state={
  content:false,
  background:false
};
componentDidMount() {
 fetch(`${window.apiUri}/onas`)
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
  console.log(this.state.background)
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