import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getSubpage} from './../../services/subpageService'
import axios from 'axios';
import http from "../../services/httpService";

class Nav extends Component {
    state={
        navName:"",
        tabs:false
    };

    render() {
        return (
            <div className={"topBeamLine"}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand" >{this.props.navName}</Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav mr-auto">
                            {
                                this.props.tabs.map(tab =>
                                    <li  key={tab.name} className="nav-item ">
                                        <Link key={tab.name+'href'}  className="nav-link" to={tab.link}>{tab.name} <span
                                            className="sr-only">(current)</span></Link>
                                    </li>
                                )
                            }


                        </ul>

                    </div>
                </nav>

              </div>
        );
    }
}

export default Nav;