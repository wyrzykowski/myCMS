import React, {Component} from 'react';

class Phonebar extends Component {
    state={
        phoneNumber: 'Kontakt: 692 622 745',
        style: {
            backgroundColor:'#28A745',
            color:'#fff',
            marginBottom:'-1%',
            minHeight:'30px'
        }
    }


    render() {


        return (
            <div style={this.state.style}>
                <h3>{this.state.phoneNumber}</h3>
            </div>
        );
    }
}
export default Phonebar;