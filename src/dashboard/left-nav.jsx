import React, { Component } from "react";
import { Link } from "react-router-dom";

class LeftNav extends Component {
  state={
    contents:[]
  }

  componentDidMount() {

    const contents = [
      'Strona główna',
      'O nas',
      'Galeria',
      'Oferta',
      'Kontakt'
    ]
    this.setState({contents})
  }


  render() {
    return (
      <div className="">
        <nav className="">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">

              <h6
                className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span> Wygląd:</span>
                <a className="d-flex align-items-center text-muted" href="#">
                  <span data-feather="plus-circle"></span>
                </a>
              </h6>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/edit-colors">
                  Ustaw kolory
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/edit-text-styles">
                  Styluj teksty
                </Link>
              </li>
            </ul>

            <h6
              className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Podstrony:</span>
              <a className="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul className="nav flex-column mb-1">
              {
                this.state.contents.map(content=>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/edit-content">
                      {content}
                    </Link>
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

export default LeftNav;