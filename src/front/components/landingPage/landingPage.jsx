import React, {Component} from 'react';
import Slideshow from './slideshow'
import Someinfo from './someinfo'
import {Route,Switch,Redirect} from 'react-router-dom';
import { getSubpage } from "../../../services/subpageService";

class LandingPage extends Component {
  state={
    content:false,
  }

async componentDidMount() {

  const {data} = await getSubpage('home');
  var content;
  if( data.length===0) content = false; //if can't fetch data set false to avoid error occur
  else content = data[0];
  this.setState({content});
}

  render() {
        return (
        //  !this.state.content ?  <Redirect to="/not-found" /> :
            <div  style={{minHeight:window.innerHeight-this.props.height}}>
                <Slideshow/>
                <Someinfo content={this.state.content}/>
            </div>
        );
    }
}

export default LandingPage;