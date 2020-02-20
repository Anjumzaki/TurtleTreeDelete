import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import axios from "axios";

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: null
    };
  }

  componentWillMount() {
    // const { paragraphs } = this.props.location.state
    // console.log("details",paragraphs)
    console.log("and", this.props);

    axios
      .get(
        "https://turtletreelabs.com/get/one/news/" +
          this.props.match.params.heading.split("-").join(" ")
      )
      .then(resp => {
        console.log("resspppppppp", resp.data);
        this.setState({ news: resp.data });
      });
  }
  componentDidMount() {
    console.log("and1", this.props);
  }

  render() {
    console.log("state", this.state, this.props);
    return (
      <div className="container" style={{ marginTop: 100 }}>
        <div className="row">
          <div className="col-md-12 col-12 ">
            <div style={{ textAlign: "center" }}>
              <CardTitle
                style={{ margin: "auto",marginBottom:'10px', fontSize: 25, color: "gray" }}
              >
                    {this.state.news !== null && this.state.news.mainDetail}
              </CardTitle>
            </div>
            {this.state.news !== null && (
              <img
                style={{ width: "100%" }}
                crossOrigin="anonymous"
                // src={require('../../../assets/milk.jpg')}
                onError={e => {
                  e.target.src =
                    "https://turtletree-labs-website.appspot.com/getImages/news-" +
                    this.state.news.heading.split(" ").join("-") +
                    "1.jpg";
                }}
                src={
                  "https://turtletree-labs-website.appspot.com/getImages/news-" +
                  this.state.news.heading.split(" ").join("-") +
                  "1.jpg"
                }
                alt="Card image cap"
              />
            )}
            <Card className="myCard">
              <CardBody>
                {this.state.news !== null &&
                  this.state.news.paragraphs.map((para, ind) => (
                    <span>
                      <CardTitle
                        style={{ margin: "auto", fontSize: 20, color: "gray" }}
                      >
                        {para.heading}
                      </CardTitle>
                      <p style={{ fontSize: 15 }} className="cardPara">
                        {para.paragraph}
                      </p>
                    </span>
                  ))}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
