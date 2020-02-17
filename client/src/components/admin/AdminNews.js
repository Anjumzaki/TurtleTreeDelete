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
import "./adminNews.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default class AdminNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      heading: "",
      mainDetail: "",
      paragraphs: [
        {
          file: "",
          imagePreviewUrl: "",
          heading: "",
          paragraph: ""
        }
      ],
      email: "",
      password: "",
      cEmail: "turtletree@gmail.com",
      cPass: "turtletree",
      loggedIn: false,
      psError: "",
      loading: false,
      postingError: "",
      linked: "AddNews",
      news: [],
      names: []
    };
    this.valueChanged = this.valueChanged.bind(this);
    this.valueChanged1 = this.valueChanged1.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getNews = () => {
    axios.get("https://turtletreelabs.com/get/news").then(resp => {
      this.setState({ news: resp.data });
    });
  };
  componentWillMount() {
    this.getNews();
  }

  componentDidMount() {
    console.log("NEWSSSSSSSSSSSSSS", this.state.news);
    this.state.news.map((news, ind) => {
      console.log("called");
      this.state.names.push(news.heading.split(" ").join("-"));
    });
  }
  // componentDidMount()
  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", this.state.file);
  }
  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }
  handleParaTitle(e, i) {
    var pre = [...this.state.paragraphs];
    pre[i].heading = e.target.value;
    this.setState({
      paragraphs: pre
    });
    console.log(this.state);
  }
  handleParagraph(e, i) {
    var pre = [...this.state.paragraphs];
    pre[i].paragraph = e.target.value;
    this.setState({
      paragraph: pre
    });
    console.log(this.state);
  }

  _handleImageChangePara(e, i) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    var pre = [...this.state.paragraphs];
    reader.onloadend = () => {
      pre[i].file = file;
      pre[i].imagePreviewUrl = reader.result;
      pre[i].isPic = true;
    };

    this.setState({
      paragraphs: pre
    });
    reader.readAsDataURL(file);
  }
  handleAddPara = () => {
    var pre = [...this.state.paragraphs];
    pre.push({
      file: "",
      imagePreviewUrl: "",
      heading: "",
      paragraph: ""
    });
    this.setState({
      paragraphs: pre
    });
  };
  removePara(i) {
    var pre = [...this.state.paragraphs];
    if (pre.length > 1) {
      pre.splice(i, 1);
      this.setState({
        paragraphs: pre
      });
    } else {
      alert("One Paragraph is necessary");
    }
  }

  valueChanged(event) {
    this.setState({
      heading: event.target.value //set this.state.value to the input's value
    });
  }

  valueChanged1(event) {
    this.setState({
      mainDetail: event.target.value //set this.state.value to the input's value
    });
  }

  postNews = () => {
    this.setState({
      loading: true
    });
    if (this.state.file) {
      if (this.state.heading) {
        if (this.state.mainDetail) {
          var paragraphs = this.state.paragraphs.map((para, index) => {
            return {
              heading: para.heading,
              paragraph: para.paragraph,
              isPic: para.isPic
            };
          });
          // console.log(paragraphs,{
          //     heading: this.state.heading,
          //     mainDetail: this.state.mainDetail,
          //     mainPic: this.state.imagePreviewUrl,
          //     paragraphs: paragraphs,
          // })
          axios
            .post("https://turtletreelabs.com/api/post/news", {
              heading: this.state.heading,
              mainDetail: this.state.mainDetail,
              // mainPic: this.state.imagePreviewUrl,
              paragraphs: paragraphs
            })
            .then(resp => {
              console.log(resp);
              this.setState({
                loading: false
              });
              alert("News posted");
              var name = this.state.heading.split(" ").join("-");
              console.log("name", name);
              this.imageUpload(name, this.state.file, 1);
              // var ind =2
              for (var i = 0; i < this.state.paragraphs.length; i++) {
                if (this.state.paragraphs[i].imagePreviewUrl !== "") {
                  console.log(
                    "paraaaaaaaaaaaaa file",
                    this.state.paragraphs[i].file
                  );
                  this.imageUpload(name, this.state.paragraphs[i].file, i + 2);
                  // ind=ind+1
                }
              }
            })
            .catch(err => console.log(err));
        } else {
          alert("Paragraph is important");
          this.setState({
            loading: false
          });
        }
      } else {
        alert("Header Title Is required");
        this.setState({
          loading: false
        });
      }
    } else {
      alert("Header image is required");
      this.setState({
        loading: false
      });
    }
  };

  imageUpload(name, file, ind) {
    console.log("checkkkkkkkkkk", name, file, ind);
    const formData = new FormData();
    console.log(this.state, " Im in image uiplod");
    formData.append("photo", file);
    if (true) {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          id: name + ind
        }
      };
      axios
        .post("https://turtletreelabs.com/upload", formData, config)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    let { imagePreviewUrl } = this.state;
    console.log("state", this.state);
    return (
      <div style={{ backgroundColor: "white" }}>
        {!this.state.loggedIn ? (
          <div
            style={{
              width: "100%",
              height: "100vh",
              backgroundColor: "#ecf0f1",
              paddingTop: "30vh"
            }}
          >
            <div
              className="col-6 loginCard"
              style={{ backgroundColor: "#2980b9" }}
            >
              <h5 style={{ color: "white", textAlign: "center" }}>Login</h5>
              <input
                placeholder={"Username"}
                style={{
                  margin: "10px",
                  padding: "8px 15px",
                  borderRadius: 5,
                  borderWidth: 0,
                  borderStyle: "solid"
                }}
                name="email"
                onChange={this.handleChange}
              />
              <input
                type="password"
                placeholder={"Password"}
                style={{
                  margin: "10px",
                  padding: "8px 15px",
                  borderRadius: 5,
                  borderWidth: 0,
                  borderStyle: "solid"
                }}
                name="password"
                onChange={this.handleChange}
              />
              <h6 style={{ color: "red" }}>{this.state.psError}</h6>
              <div>
                <Button
                  onClick={() => {
                    if (
                      this.state.email === this.state.cEmail &&
                      this.state.password === this.state.cPass
                    ) {
                      this.setState({ loggedIn: true, psError: "" });
                    } else {
                      this.setState({
                        psError: "Wrong or empty username and Password"
                      });
                    }
                  }}
                  style={{
                    margin: 10,
                    backgroundColor: "white",
                    color: "#7f8c8d"
                  }}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="sidebarmenu">
              <h5 className="mainAdminText">Turtle Tree Admin</h5>
              <div
                onClick={() => this.setState({ linked: "AddNews" })}
                className="sideMenuLinks"
              >
                Add News
              </div>
              <div
                onClick={() =>
                  this.setState({ linked: "DeleteNews" }, this.getNews())
                }
                className="sideMenuLinks"
              >
                Delete News
              </div>
            </div>
            <div
              className="container"
              style={{ paddingTop: "130px", paddingLeft: "150px" }}
            >
              {this.state.linked == "AddNews" && (
                <div>
                  <div style={{ width: "100%" }}>
                    <h5>Heading Details</h5>
                    <div className="uploadCards">
                      <h6>1-Header Image (800 X 400)</h6>
                      {this.state.imagePreviewUrl ? (
                        <img
                          className="imageTem"
                          src={this.state.imagePreviewUrl}
                        />
                      ) : (
                        <div className="imageTem"></div>
                      )}
                      <div className="previewComponent">
                        <form onSubmit={e => this._handleSubmit(e)}>
                          <input
                            className="fileInput"
                            type="file"
                            accept="image/jpeg"
                            onChange={e => this._handleImageChange(e)}
                          />

                          <h6
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                          >
                            2-Header Title
                          </h6>
                          <div>
                            <textarea
                              value={this.state.heading}
                              type="text"
                              onChange={this.valueChanged}
                              cols="50"
                              className="inForms"
                            />
                          </div>
                          <h6
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                          >
                            3-Paragraph
                          </h6>
                          <div>
                            <textarea
                              value={this.state.mainDetail}
                              type="text"
                              onChange={this.valueChanged1}
                              cols="50"
                              rows="8"
                              className="inForms"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {this.state.paragraphs.map((item, i) => (
                    <div key={i} style={{ width: "100%" }}>
                      <h5> {i + 1}-Paragragh Details</h5>
                      <div className="uploadCards">
                        <h6 style={{ marginTop: "20px", marginBottom: "20px" }}>
                          1-Paragraph Title (if any)
                        </h6>
                        <div>
                          <textarea
                            onChange={e => this.handleParaTitle(e, i)}
                            cols="50"
                            className="inForms"
                          />
                        </div>
                        <h6 style={{ marginTop: "20px", marginBottom: "20px" }}>
                          2-Paragraph image (if any)
                        </h6>
                        {this.state.paragraphs[i].imagePreviewUrl ? (
                          <img
                            className="imageTem"
                            src={this.state.paragraphs[i].imagePreviewUrl}
                          />
                        ) : (
                          <div className="imageTem"></div>
                        )}
                        <div className="previewComponent">
                          <form onSubmit={e => this._handleSubmit(e, i)}>
                            <input
                              className="fileInput"
                              type="file"
                              accept="image/jpeg"
                              onChange={e => {
                                this._handleImageChangePara(e, i);
                              }}
                            />
                          </form>
                        </div>
                        <h6 style={{ marginTop: "20px", marginBottom: "20px" }}>
                          3-Paragraph
                        </h6>
                        <div>
                          <textarea
                            onChange={e => this.handleParagraph(e, i)}
                            cols="50"
                            rows="10"
                            className="inForms"
                          />
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <Button
                            onClick={() => this.removePara(i)}
                            style={{ backgroundColor: "red" }}
                          >
                            Remove Paragragh
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div>
                    <div className="buttonss">
                      <Button onClick={this.handleAddPara}>
                        Add New Paragragh
                      </Button>
                      {this.state.loading ? (
                        <img src={require("../../assets/loader.gif")} />
                      ) : (
                        <Button
                          style={{ backgroundColor: "green" }}
                          className="submitButton"
                          onClick={() => this.postNews()}
                        >
                          Post
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {this.state.linked == "DeleteNews" && (
                <div className="container" style={{}}>
                  <div className="row">
                    {this.state.news &&
                      this.state.news.map((news, ind) => (
                        <div className="col-md-4 col-6 ">
                          <Card className="myCard">
                            <img
                              width="100%"
                              // src={require('../../../assets/milk.jpg')}
                              onError={e => {
                                e.target.src =
                                  "https://turtletreelabs.com/getImages/news-" +
                                  news.heading.split(" ").join("-") +
                                  "1.jpg";
                              }}
                              src={
                                "https://turtletreelabs.com/getImages/news-" +
                                news.heading.split(" ").join("-") +
                                "1.jpg"
                              }
                              alt="Card image cap"
                              crossOrigin="anonymous"
                            />

                            <CardBody>
                              <CardTitle>{news.heading}</CardTitle>

                              <p className="cardPara">{news.mainDetail}</p>
                              <Button className="cardPara">
                                {" "}
                                <Link
                                  style={{ color: "#fff" }}
                                  // to={"/news/detail/"+news._id}
                                  to={
                                    "/news/detail/" +
                                    news.heading.split(" ").join("-")
                                  }
                                >
                                  {" "}
                                  Read more
                                </Link>
                              </Button>
                              <div>
                                <Button
                                  onClick={() => {
                                    axios
                                      .post(
                                        "https://turtletreelabs.com/api/delete/news/" +
                                          news._id
                                      )
                                      .then(res => alert("News Deleted"))
                                      .then(this.getNews());
                                  }}
                                  style={{
                                    background: "red",
                                    border: "none",
                                    margin: 10
                                  }}
                                  className="cardPara"
                                >
                                  Delete
                                </Button>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
