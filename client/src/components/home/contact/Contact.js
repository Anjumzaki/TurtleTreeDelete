import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';


function Contact() {
    const [form, setValues] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        recipient: 'pr@turtletreelabs.com',
      });

    const printValues = e => {
        e.preventDefault();
        console.log(form.name, form.email, form.subject, form.message);
      };
      const updateField = e => {
        setValues({
          ...form,
          [e.target.name]: e.target.value
        });
      };

    return (
        <div className="aboutDiv contactDiv" id="contact">
            <div className="row row-eq-height">
                <div className=" col-12 col-md-6"> 
                <div className="abChild">
                    <div className="line"></div>
                    <div className="abHead"> 
                        <h5><b> Contact</b></h5>
                        <p className="conP">pr@turtletreelabs.com</p>

                        <div className="abhead2">
                            <a href="https://www.linkedin.com/company/23722841/">
                            <img width="25px" src={require('../../../assets/linkd.webp')}></img>
                            </a>
                            <p className="conP1">2019 TurtleTree Labs</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col-12 col-md-6 milkBack1 ">
                    <div className="cd ..   ">
                    <input className="contI" type="text" placeholder="Name" value={form.name} name="name" onChange={updateField}></input>
                    <input className="contI" type="email" placeholder="Email" value={form.email} name="email" onChange={updateField}></input>
                    <input className="contI" type="text" placeholder="Subject" value={form.subject} name="subject" onChange={updateField}></input>
                    <textarea className="contI" placeholder="Message" value={form.message} name="message" onChange={updateField}></textarea>
                    <button className="btn btnSb" onClick={() => {
                        console.log("dabaaaaaaaaaaaaaaa")
                        axios.post('https://turtletreelabs.com/postmessage', {
                            name: form.name,
                            email: form.email,
                            recipient: "pr@turtletreelabs.com",
                            message: form.message,
                            subject: form.subject
                     })}}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
