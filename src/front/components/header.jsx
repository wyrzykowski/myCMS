import React, {Component} from 'react';
import Phonebar from './phonebar'
import Nav from './nav'
import './../../css/customStyle.css'


class Header extends Component {
  //component getting height themselves
  state = {
    width: null,
    height: null,
  };

  saveRef = (ref) => this.containerNode = ref;

  measure() {

    const {clientWidth, clientHeight} = this.containerNode

    this.setState({
      width: clientWidth,
      height: clientHeight,
    })
  }

  componentDidMount() {
    this.measure();
  }



  handleHeight = () => {
    var height = this.state.height;
    this.props.onGetHeight(height);
  }

  render() {
        return (

            <div ref={this.saveRef}>
                <Phonebar/>
                <Nav tabs={this.props.tabs} navName={this.props.navName} />
            </div>
        );
    }
}

export default Header;