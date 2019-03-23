import React, { Component } from "react";
import GalleryMain from "./gallery_components/gallery-main"
import { getSubpage } from "../../services/subpageService";
class Gallery extends Component {
  state={
    images:[]
  }


  async getImages(callback) {
    const {data} = await getSubpage('galeria');
    var content;
    if( data.length===0) content = false; //if can't fetch data set false to avoid error occur
    else{
      content = data[0];
      callback(content.block[0].content)
    }

  }

  render() {
    return (
      <div  style={{minHeight:window.innerHeight-this.props.height}}>
        <h2 className="h1 text-center mt-4">Galeria</h2>
        <GalleryMain getImages = {this.getImages} images={this.state.images}/>
      </div>
    )
  }
}
export default Gallery;
