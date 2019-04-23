import React, { Component } from "react";
import {sendStyle, getStyle} from "../services/stylesService";
import cssToJS from "transform-css-to-js"

const colorPickerLabelStyle={
  margin:"1vw"
};

const colorPickerStyle={
  cursor:"pointer"
};



class EditColors extends Component {
   css = ``;
  state={
    topBeamColor:"#fffff2",
    topBeamBackgroundColor:"#fffff2",
    footerColor:"#fcffec",
    footerBackgroundColor:"#fcffec"
  };
async componentDidMount(){

  const {data}= await getStyle('style');
  //console.log("style",data);
  const jsStyle = cssToJS(data);
  const json = JSON.stringify(eval("(" + jsStyle + ")"));
  const obj = JSON.parse(json);

  const topBeamColor = obj.topBeamColorClass.color;
  const footerColor = obj.footerColorClass.color;

  const footerBackgroundColor = obj.footerColorClass.backgroundColor;
  const topBeamBackgroundColor= obj.topBeamColorClass.backgroundColor;

  this.setState({topBeamColor,footerColor,topBeamBackgroundColor,footerBackgroundColor});

}

  handleFooterColorChange=(event)=>{
    this.setState({ footerColor: event.target.value})
  };

  handleFooterBackgroundColorChange=(event)=>{
    this.setState({ footerBackgroundColor: event.target.value})
  };

  handleTopBeamColorChange=(event)=>{
    this.setState({ topBeamColor: event.target.value})
  };

  handleTopBeamBackgroundColorChange=(event)=>{
    this.setState({ topBeamBackgroundColor: event.target.value})
  };

  handleSave =()=>{
    console.log("SAVE");
    const data={
      footerColor: { "color": this.state.footerColor,"background-color":this.state.footerBackgroundColor },
      topBeamColor: {"color": this.state.topBeamColor,"background-color":this.state.topBeamBackgroundColor},
      topBeamLine: {"border-bottom": `1px solid ${this.state.topBeamBackgroundColor}`}

    };

    sendStyle(data,()=>{
      console.log("wyslane");
    })
  };

  renderButton(label) {
    return (
      <button  ref="btn"  className="btn btn-primary mb-4" onClick={this.handleSave}>
        {label}
      </button>
    );
  }



  render() {

    return (
      <div>
        <h1>Edit colors</h1>

        <div>
          <input onChange={this.handleTopBeamColorChange} style={colorPickerStyle} type="color" id="topBeamColor" name="topBeam"
                 value={this.state.topBeamColor}/>
            <label style={colorPickerLabelStyle}>top beam</label>
        </div>

        <div>
          <input onChange={this.handleTopBeamBackgroundColorChange} style={colorPickerStyle} type="color" id="topBeamColor" name="topBeam"
                 value={this.state.topBeamBackgroundColor}/>
          <label style={colorPickerLabelStyle}>top beam background</label>
        </div>


        <div>
          <input onChange={this.handleFooterColorChange} style={colorPickerStyle} type="color" id="footerColor" name="footer"
                  value={this.state.footerColor}/>
          <label style={colorPickerLabelStyle}>footer</label>
        </div>

        <div>
          <input onChange={this.handleFooterBackgroundColorChange} style={colorPickerStyle} type="color" id="footerColor" name="footer"
                 value={this.state.footerBackgroundColor}/>
          <label style={colorPickerLabelStyle}>footer background</label>
        </div>


        <br/>
        <br/>

        {this.renderButton("save")}

      </div>



    );
  }
}

export default EditColors;