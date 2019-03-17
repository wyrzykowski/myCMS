import React, {Component} from 'react';
import Phonebar from './phonebar'
import Nav from './nav'


class Header extends Component {
  //component getting height themselves
  state = {
    width: null,
    height: null,

  }

  saveRef = (ref) => this.containerNode = ref

  measure() {

    const {clientWidth, clientHeight} = this.containerNode

    this.setState({
      width: clientWidth,
      height: clientHeight,
    })
  }

  componentDidMount() {
    this.measure();
    const navName = this.state.navName + "Fakfajzer";
    fetch("http://localhost:3001/fakfajzer/nav")
      .then(res => res.json())
      .then(tabs => this.setState({tabs}))
  }



  handleHeight = () => {
    var height = this.state.height;
    this.props.onGetHeight(height);
  }

  render() {
        return (
            <div   ref={this.saveRef}>
                <Phonebar/>
                <Nav tabs={this.props.tabs} nab/>
            </div>
        );
    }
}

export default Header;