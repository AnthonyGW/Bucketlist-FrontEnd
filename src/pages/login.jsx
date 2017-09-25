import React, { Component } from 'react';
import axios from 'axios';

// import Nav from '../Components/nav';
import * as authactions from '../actions/authactions';
import tokenStore from '../stores/TokenStore';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    handleChange(event){
        //Validate the email format
        this.setState({
         [event.target.id]: event.target.value,
        })
    }
    handleSubmit(e){
        e.preventDefault()
        const payload = {
            "email" : this.state.email,
            "password" : this.state.password
        }
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/auth/login',
            data: payload,
            withCredentials: false
            // headers: {'Origin': '*'}
        }).then((response) => {
                    console.log(response.data['message']);
                    console.log(response.data['access_token']);
                    authactions.setAuthToken(response.data['access_token']);
                    const resp = tokenStore.getToken();
                    console.log('The token that was set', resp);
        }).catch((error) => {
        console.log(error);
        });
    }

    render(){
      return (
        <div>
          {/* <Nav /> */}
          <h2>Log in to your account</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
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
}
