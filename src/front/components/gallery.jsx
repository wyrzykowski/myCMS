import React, { Component } from "react";
import GalleryMain from "./gallery_components/gallery-main"
import { getSubpage } from "../../services/subpageService";
class Gallery extends Component {
  state={
    images:[],
    h1:""
  }
  //To can use this.state in getImage method
  constructor() {
    super();
    this.getImages = this.getImages.bind(this);
  }



  async getImages(callback){
    const {data} = await getSubpage('gallery');
    var content;
    if( data.length===0) content = false; //if can't fetch data set false to avoid error occur i render method
    else{
      content = data[0];
      const h1  = content.block[0].h1;
      this.setState({h1});
      callback(content.block[0].content)
    }

  }

  render() {
    return (
      <div  style={{minHeight:window.innerHeight-this.props.height}}>
        <h2 className="h1 text-center mt-4">{this.state.h1}</h2>
        <GalleryMain getImages = {this.getImages} images={this.state.images}/>
      </div>
    )
  }
}
export default Gallery;
