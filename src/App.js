import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
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

class App extends Component {
  render() {
    return (
     <div>
         <Header/>
         <Switch>
           <Route path="/contact" component={Contact} />
           <Route path="/offer" component={Offer}/>
           <Route path="/about" component={About}/>
           <Route path="/gallery" component={Gallery}/>
           <Route path="/" component={LandingPage}/>
         </Switch>





         <Footer/>
     </div>


    );
  }
}

export default App;
