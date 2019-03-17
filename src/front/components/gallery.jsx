import React, { Component } from "react";
import GalleryMain from "./gallery_components/gallery-main"
class Gallery extends Component {
  state={
    images:[]
  }
  componentDidMount() {
    fetch(`${window.apiUri}/galeria`)
      .then(res=>res.json())
      .then(contentArray=>{
        const content = contentArray[0];
        console.log(content);
      }).catch(e=>{
        this.setState({images:false})
      }
      )


  }

  render() {
    return (
      <div  style={{minHeight:window.innerHeight-this.props.height}}>
        <h2 className="h1 text-center mt-4">Galeria</h2>
        <GalleryMain/>
      </div>
    )
  }
}

export default Gallery;