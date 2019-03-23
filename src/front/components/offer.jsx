import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { getSubpage } from "../../services/subpageService";

class Offer extends Component {
  state={
    content:[],
    background: false
  };
  async componentDidMount() {
    const {data} = await getSubpage('oferta');
    var content;
    if( data.length===0) content = false; //if can't fetch data set false to avoid error occur
    else content = data[0];
    this.setState({content:content.block[0].content,background:content.background});
  }

  render() {

    const style={
      background: `url('${this.state.background}')  no-repeat left center fixed`,
      minHeight:window.innerHeight-this.props.height,

    }

    return (
      !this.state.content ?  <Redirect to="/not-found" /> :
      <div   className="container-fluid"   style={style}>
        <div className="row" id="offer" >

        <div className="col-md-6 col-lg-7 col-xl-7 col-sm-12">
        </div>
         <div>
          {
            this.state.content.map(content =>
              {
                switch(content.type) {
                  case 'h1':
                    return <div key={content.text+Math.random()}className="h1 mt-4"><h1 >{content.text}</h1></div>;
                  case 'p':
                    return <div key={content.text+Math.random()} className='p'><p>{content.text}</p></div>;
                  case 'h2':
                    return <div  key={content.text+Math.random()}className='h3'><p>{content.text}</p></div>;
                  case 'ul':

                    return (
                      <ul key={content.text+Math.random()} className="">
                        {
                          content.text.map(li =>
                            <li className="col-xl-12" key={li.toString()+Math.random()}>{li}</li>
                          )
                        }
                      </ul>
                  )
                  default:
                    return '';
                }
              }
            )
          }
         </div>
        </div>

      </div>
    );
  }
}

export default Offer;