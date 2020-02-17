
import React, { Component } from 'react';
import vid from "../../../assets/HappyCow2.mp4";
import './Video.css'
var vids;
class VideoSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0, height: 0,
            backVid: vid
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        vids = document.getElementById("background-video");
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            <div className="shad" id="why" style={{ position: "relative", height: "100%", paddingTop: "5px" }}>
                <div style={{

                    borderRadius: "10px",
                }}>

                </div>
                <video className="background-video" autoPlay loop muted style={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    zIndex: 0

                }}>
                    <source src={this.state.backVid} type="video/mp4" />
                    <source src={this.state.backVid} type="video/ogg" />
                    Your browser does not support the video tag.
                    <h1>asgdkasd</h1>
                </video>
                        <div style={{
                            width: "100%",
                            position: "absolute",
                            // marginLeft: "-50px",
                            top: "70%",
                            // marginTop: "-50px",
                            display: "flex",
                            zIndex: 1,
                        }}>
                            <h3 style={{
                                color: "#fff",
                                fontWeight: 'bold',
                                justifyContent: "center",
                                margin: "0px auto",
                                fontSize: this.state.width * 0.02
                            }}
                            >
                                <div className="videoText" style={{ display: "flex", justifyContent: "center" ,textAlign:'center'}}>
                                    HAPPY COWS MAKE HAPPY MILK <br />
                                BUT HOW MANY OF US GET ACCESS TO HAPPY COW? <br/>
                                Only 10% of the world's cows are grazing animals
                                </div>
                        <div style={{ display: "flex", justifyContent: "center" }}><h4 style={{ justifyContent: "center" }}></h4></div>
                            </h3>

                        </div>
                
            </div >
        )
    }
};

export default VideoSection;