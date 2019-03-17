import React, {Component} from 'react';
class ShowImage extends Component {

    constructor(props) { //is use to handleKeyDown can have access to props
        super(props);
    }

    handleKeyDown=(key)=>{
        if(key.code==="ArrowRight") this.props.imageForward();
        else if(key.code==="ArrowLeft") this.props.imageBack();
        else if(key.code==="Escape") this.props.imageClose();
    }

    componentDidMount() {window.addEventListener('keydown', this.handleKeyDown)};

    componentWillUnmount() {window.removeEventListener('keydown', this.handleKeyDown);}

    render() {
        return (
          <div >
              <div id="show_image">
                  <div id="showed_image">
                      <div id="picture">
                          <img src={this.props.image} alt="picture-1" alt={this.props.alt}/>
                      </div>
                      <div id="close" onClick={this.props.imageClose}>
                          &#10006;
                      </div>

                      <div id="forward" onClick={this.props.imageForward} style={this.props.showForward ? {display:"block"}: {display:"none"}} >
                          <p>{'>'}</p>
                      </div>

                      <div id="back" onClick={this.props.imageBack} style={this.props.showBack ? {display:"block"}: {display:"none"}}>
                          <p>{"<"}</p>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default ShowImage;