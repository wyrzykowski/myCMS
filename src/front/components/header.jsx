import React, {Component} from 'react';
import Phonebar from './phonebar'
import Nav from './nav'
class Header extends Component {


    render() {
        return (
            <div>
<Phonebar/>
<Nav/>

            </div>
        );
    }
}

export default Header;