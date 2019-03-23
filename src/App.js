import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import "bootstrap/dist/css/bootstrap.css";
import './css/main.css';
import Header from './front/components/header'
import LandingPage from './front/components/landingPage/landingPage'
import Footer from './front/components/footer';
import Contact from './front/components/contact';
import Offer from './front/components/offer';
import About from './front/components/about';
import Gallery from './front/components/gallery';
import NotFound404 from './front/components/not-found-404'
import { getSubpage } from "./services/subpageService";
class App extends Component {

  state={
    tabs:[],
    navName:''

  }
  async componentDidMount() {
    const {data} = await getSubpage('nav/main_nav');
    this.setState({tabs: data[0].content, navName: data[0].navbar_label});
  }

  style={
  constComponentHeight: 0,
  setHeight: false,
  headerHeight: 0,
  footerHeight: 0
}
//Start setting constComponetHeight
handleHeaderHeight = (height)=>{
if(this.setHeight===false) { //I have to force that setState can be setting altetnately, otherwise one of them won't be added
  const setHeight =true;
  const constComponentHeight = (this.constComponentHeight+height);
  this.setState({ constComponentHeight,setHeight });
}
}
  handleFooterHeight = (height)=>{
    const constComponentHeight = height + this.style.constComponentHeight;
    if(this.style.setHeight===true) {
      const setHeight = false;
      this.setState({ constComponentHeight,setHeight });
    }
  }
//End setting constComponetHeight
  render() {
    return (

     <div>
         <Header tabs={this.state.tabs } navName={this.state.navName} onGetHeight={this.handleHeaderHeight} />
         <Switch>
           <Route path="/contact" render={(props)=><Contact height={this.style.constComponentHeight} {...props} />}/>
           <Route path="/offer" render={(props)=><Offer height={this.style.constComponentHeight} {...props} />}/>
           <Route path="/about" render={(props)=><About height={this.style.constComponentHeight} {...props} />}/>
           <Route path="/gallery" render={(props)=><Gallery height={this.style.constComponentHeight} {...props} />}/>
           <Route exact path="/home" render={(props)=><LandingPage height={this.style.constComponentHeight} {...props} />}/>
           <Route path="/not-found" render={props=><NotFound404 height={this.style.constComponentHeight} {...props}/> } />
           <Redirect exact from="/" to="home"/>
           <Redirect  to="/not-found" />


         </Switch>
         <Footer onGetHeight={this.handleFooterHeight}/>
     </div>


    );
  }
}

export default App;
