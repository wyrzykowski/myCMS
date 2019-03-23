import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getSubpage} from './../../services/subpageService'
import axios from 'axios';
import http from "../../services/httpService";

class Nav extends Component {
    state={
        navName:"",
        tabs:false
    }

    render() {
        return (
            <div id="main-nav">
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
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search"/>

                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>

              </div>
        );
    }
}

export default Nav;