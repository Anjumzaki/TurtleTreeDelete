import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  } from 'reactstrap';
  import logo from "./images/tt_logo.png";
  import{Link} from 'react-scroll'
import "./style.css"
export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className="header-container">
        <Navbar light expand="lg" className="header-container2">
          <a href="/"><img className="header-logo" src={logo} alt=""/></a>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto " navbar>
              <NavItem>
                <NavLink  >
                <a href="/" className="header-link">  Home </a>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink  >
                <a href="/" className="header-link">   Why </a>
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink ><a href="/" className="header-link">  About </a></NavLink>
              </NavItem>
              <NavItem>
                <NavLink ><a className="header-link" href="/">Blog</a></NavLink>
              </NavItem>
              <NavItem>
                <NavLink ><a href="/" className="header-link">  Contact </a></NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/news"><a href="/news" className="header-link">  News</a></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}