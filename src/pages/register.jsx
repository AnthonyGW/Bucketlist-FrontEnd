import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            email: "",
            password: "",
        };
    }

    handleChange(event){
        //Validate the email and password format, search for email, password and username in records
        this.setState({
         [event.target.id]: event.target.value,
        })
    }
    handleSubmit(e){
        e.preventDefault()
        const payload = {
            'name': this.state.name,
            'email': this.state.email,
            'password': this.state.password
        }
        axios({
            method: 'post',
            url: 'http://bucketlistultimaapi.herokuapp.com/auth/register',
            data: payload
        }).then((response) => {
            console.log(response.data['message']);
            window.location='/auth/login';
        }).catch((error) => {
            console.log(error);
    });
    }
    render(){
      return (
        <div>
          <h2>Create New Account</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>Enter your username:</label><br />
            <input type="text" onChange={this.handleChange.bind(this)} id="name" placeholder="Username" />
            <br />
            <label>Enter your email:</label><br />
            <input type="text"  onChange={this.handleChange.bind(this)} id="email" placeholder="Email" />
            <br />
            <label>Enter your password:</label><br />
            <input type="password" onChange={this.handleChange.bind(this)} id="password" placeholder="Password" />
            <br />
            <input type="submit" />
          </form>
        </div>
        )
    }
};
