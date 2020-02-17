import React from 'react';
import './About.css';



function About() {
    return (
        <div className="aboutDiv" id='about'>
            <div className="row row-eq-height">
                <div className=" col-12 col-md-6"> 
                <div className="abChild">
                    <div className="line"></div>
                    <div className="abHead">
                        <h1><b> ABOUT TURTLETREE LABS</b></h1>
                        <p>TurtleTree Labs is recreating real milk inside a lab using the latest cutting edge innovation in biotech. Our focus on execution will disrupt this multi-billion dollar industry while reducing the carbon footprint on this planet. Our innovation will provide millions access to safer, reliable and higher quality dairy products.</p>
                    </div>
                </div>
                </div>
                <div className="col-12 col-md-6 milkBack">
                    <img src={require('../../../assets/about.jpg')}></img>
                </div>
            </div>

        </div>
    );
}

export default About;
