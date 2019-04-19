import React, { Component } from "react";

class FileButton extends Component {
  state ={
    imageFile:false
  }


  //For single file
  onFileButtonChange(e){
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e)=> {
      // console.warn("img data", e.target.result);

      this.setState({imageFile:e.target.result});
      this.handleImageChange();
    }
  }
  handleImageChange(){
    this.props.onSelectImage(this.state.imageFile);
}



  render() {
   const {name,label}=this.props;
   console.log("props",name)
    return (
      <div>
        <div style={{marginBottom:"3vh"}}>
          <p>{name}</p>
          <div>
            <div className="custom-file">
              <input  onChange={(e)=>this.onFileButtonChange(e)} type="file" className="btn custom-file-input" id="inputGroupFile03"/>
              <label className="custom-file-label" htmlFor="inputGroupFile03">{label}</label>
            </div>
            {this.state.imageFile &&
            <div className="border border-light">

              <img  style={{ width: "50%", margin: "0% 25% 0% 25%" }}
                    src={this.state.imageFile} alt="Red dot"/>
            </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default FileButton;


