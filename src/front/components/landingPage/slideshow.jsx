import React, {Component} from 'react';
import { Slide } from 'react-slideshow-image';

class Slideshow extends Component {

    state={
        screenWidth: window.innerWidth,
        style:{}
    }



    componentDidMount() {

        //getting image
        window.addEventListener("resize", this.updateDimensions);
        const style={
            slideStyle: {
                width: this.state.screenWidth,
                height: this.state.screenWidth / 2.8,
                backgroundRepeat: 'round'
            }
        }
        this.setState({style})
    }
    updateDimensions=() => {
        console.log("UDPATE", window.innerWidth)
        var screenWidth = window.innerWidth;
        var height = screenWidth / 2.8;
        const slideStyle = {
            width: screenWidth,
            height: height,
            backgroundRepeat: 'round',
        }
        this.setState({screenWidth,slideStyle });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }



    render() {
        const slideImages = [
            './images/slajd1.png',
            './images/slajd2.png',
            './images/slajd3.png',
            './images/slajd4.png',
        ];

        const properties = {
            duration: 3000,
            transitionDuration: 700,
            infinite: true,
            indicators: false,
            arrows: false
        }
        return (
    <div style={{backgroundColor:"#EEE", minHeight:this.state.screenWidth/2.8}}>
        <Slide {...properties}>
            <div className="each-slide" >
                <div style={{'backgroundImage': `url(${slideImages[0]})`,...this.state.style.slideStyle}}>
                </div>
            </div>
            <div className="each-slide">
                <div style={{'backgroundImage': `url(${slideImages[1]})`,...this.state.style.slideStyle}}>
                </div>
            </div>
            <div className="each-slide">
                <div style={{'backgroundImage': `url(${slideImages[2]})`,...this.state.style.slideStyle}}>
                </div>
            </div>
            <div className="each-slide">
                <div style={{'backgroundImage': `url(${slideImages[3]})`,...this.state.style.slideStyle}}>
                </div>
            </div>
        </Slide>

    </div>


        );
    }
}

export default Slideshow;