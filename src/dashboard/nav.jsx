import React, { Component } from "react";
import {Link} from 'react-router-dom';
class Nav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">{this.props.companyName}</Link>
          <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link" href="#">Sign out</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;