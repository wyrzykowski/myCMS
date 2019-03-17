import React, {Component} from 'react';
import Slideshow from './slideshow'
import Someinfo from './someinfo'
import {Route,Switch,Redirect} from 'react-router-dom';

class LandingPage extends Component {
  state={
    content:false,
  }

componentDidMount() {
  fetch(`${window.apiUri}/home`)
    .then(res => res.json())
    .then(contentArray => {
        const content = contentArray[0];
        this.setState({ content })
      },
    ).catch(error => {
    this.setState({ content: false })
  })
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