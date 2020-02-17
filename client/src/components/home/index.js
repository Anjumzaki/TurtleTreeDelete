import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  } from 'reactstrap';
import Header from './header/index';
import Video from "./video/Video";
import RealMilk from './realMilk/RealMilk';
import About from './about/About'
import Contact from './contact/Contact'
import "./style.css"

function Home() {


  return (

    <div className="home-container">
     
      <RealMilk/>
      <Video />
      <About />
      <Contact/>
    </div>
  );
}

export default Home;
