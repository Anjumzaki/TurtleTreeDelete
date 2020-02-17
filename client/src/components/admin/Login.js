import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './login.css'

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: 'turtletree@gmail.com',
            password:'turtletree',
            cEmail: 'turtletree@gmail.com',
            cPass: 'turtletree'
        };

    }
    render(){
    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: '#ecf0f1', paddingTop: '30vh' }}>

            <div className="col-6 loginCard" >

                <h5 style={{ color: 'black', textAlign: 'center' }}>Login</h5>
                <input placeholder={'Username'} style={{ margin: '10px', padding: '8px 15px', borderRadius: 5, borderWidth: 0, borderStyle: 'solid' }} />
                <input type='password' placeholder={'Password'} style={{ margin: '10px', padding: '8px 15px', borderRadius: 5, borderWidth: 0, borderStyle: 'solid' }} />
                <div>
                    <a href="/admin/news">
                        <Button onClick={() => {
                            if(this.state.email === this.state.cEmail &&
                                this.state.password === this.state.cPass){
                                    window.location = "https://turtletreelabs.com/admin/news"
                                }
                        }} style={{ margin: 10, backgroundColor: 'white', color: '#7f8c8d' }}>
                            Login
                        </Button>
                    </a>
                </div>

            </div>
        </div>
    )}
}

