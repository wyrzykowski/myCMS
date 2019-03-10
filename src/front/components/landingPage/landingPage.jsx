import React, {Component} from 'react';
import Slideshow from './slideshow'
import Someinfo from './someinfo'
import Header from "../../../App";
class LandingPage extends Component {
    render() {
        return (
            <div>
                <Slideshow/>
                <Someinfo/>
            </div>
        );
    }
}

export default LandingPage;