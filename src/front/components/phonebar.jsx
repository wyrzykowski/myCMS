import React, {Component} from 'react';

class Phonebar extends Component {
    state={
        phoneNumber: 'Kontakt: 692 622 745'
    }


    render() {


        return (
            <div className={"topBeamColor"}>
                <h3 style={{paddingBottom:"1px", margin:"0"}}>{this.state.phoneNumber}</h3>
            </div>
        );
    }
}
export default Phonebar;