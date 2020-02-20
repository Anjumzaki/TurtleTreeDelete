import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './News.css'
import axios from 'axios';
import {Link, Route} from 'react-router-dom';
export default class News extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            names: []
        };

    }

    componentWillMount(){
        
        axios.get('https://turtletreelabs.com/get/news')
        .then((resp) => {
            console.log("resspppppppp",resp.data)
            this.setState({news: resp.data})
        })
      
    }
    componentDidMount(){
        console.log("NEWSSSSSSSSSSSSSS", this.state.news)
        this.state.news.map((news,ind) => {
            console.log("called")
             this.state.names.push(news.heading.split(' ').join('-'))
        })
        console.log('I am the news')
    }
    render(){
        console.log("state",this.state)
    return (
        <div className='container' style={{marginTop:100}}>
            <div className="row">
                {this.state.news && this.state.news.map((news,ind) => (
                    <div className="col-md-4 col-6 ">
                    <Card className="myCard">
                        <img style={{width:'100%', height:'230px'}}
                        crossOrigin='anonymous'
                        // src={require('../../../assets/milk.jpg')}
                        onError={(e) => { e.target.src = 'https://turtletree-labs-website.appspot.com/getImages/news-' + news.heading.split(' ').join('-') + '1.jpg' }}
                            src={'https://turtletree-labs-website.appspot.com/getImages/news-' + news.heading.split(' ').join('-') + '1.jpg'}
                         alt="Card image cap" />
                        <CardBody>
                            <CardTitle style={{height:'125px',overflow:'hidden'}} >{news.heading}</CardTitle>
                            <p style={{height:'145px',overflow:'hidden'}} className="cardPara">{news.mainDetail}</p>
                            <Button className="cardPara"> <Link style={{color:"#fff"}} 
                            // to={"/news/detail/"+news._id}
                            to={ "/news/detail/"+news.heading.split(' ').join('-') }
                            > Read more</Link></Button>
                        </CardBody>
                    </Card>
                </div>
                ))} 
                
               
            </div>
        </div>

    )}
}

