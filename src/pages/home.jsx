import React, { Component } from 'react';
import axios from 'axios';
import { Button, Grid, Row, Col, Carousel, Image, Panel } from 'react-bootstrap';
import { FormControl, ControlLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import Nav from '../Components/nav';
import * as authactions from '../actions/authactions';

export default class Home extends Component{
    styling = {
        paddingLeft: "90px",
        paddingBottom: "10px"
    }
    container = {
        paddingTop: "70px"
    }
    constructor(){
        super();
        this.state = {
            home: false,
            register: true,
            login: true,
            name: "",
            email: "",
            password: ""
        }
    }
    toggleVisibility(section){
        if(section === 'home'){
            this.setState({
                home: false,
                register: true,
                login: true,
                name: "",
                email: "",
                password: ""
            })
            document.getElementById("register-form").reset();
            document.getElementById("login-form").reset();
        }
        else if(section === 'register'){
            this.setState({
                home: true,
                register: false,
                login: true,
                name: "",
                email: "",
                password: ""
            })
            document.getElementById("register-form").reset();
            document.getElementById("login-form").reset();
        }
        else if(section === 'login'){
            this.setState({
                home: true,
                register: true,
                login: false,
                name: "",
                email: "",
                password: ""
            })
            document.getElementById("register-form").reset();
            document.getElementById("login-form").reset();        }
    }
    handleChange(event){
        //Validate the email and password format, search for email, password and username in records
        this.setState({
         [event.target.id]: event.target.value,
        })
    }
    submitRegister(e){
        e.preventDefault();
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
            this.toggleVisibility('login');
        }).catch((error) => {
            console.log(error);
        });
    }
    submitLogin(e){
        e.preventDefault();
        const payload = {
            "email" : this.state.email,
            "password" : this.state.password
        }
        axios({
            method: 'post',
            url: 'http://bucketlistultimaapi.herokuapp.com/auth/login',
            data: payload,
            withCredentials: false
        }).then((response) => {
                    console.log("Log in message", response.data['message']);
                    console.log("Log in token", response.data['access_token']);
                    authactions.setAuthToken(response.data['access_token']);
                    authactions.resetAuthToken();
                    window.location='/bucketlists/';
        }).catch((error) => {
        console.log(error);
        });
    }
    render(){
      return (
        <Grid>
            <Row style={this.container}>
                <Col md={1} mdOffset={4}><Button bsSize="large" onClick={()=>{this.toggleVisibility('register');}}>Register</Button></Col>
                <Col md={2} style={this.styling}>
                    <Image width={60} height={60} alt="img" src={require("../assets/newlogo_lg.png")} onClick={()=>{this.toggleVisibility('home');}} thumbnail />
                </Col>
                <Col md={1}><Button bsSize="large" onClick={()=>{this.toggleVisibility('login');}}>Log In</Button></Col>
            </Row>
            <Row hidden={this.state.home}>
                <Carousel>
                    <Carousel.Item>
                        <img width={1280} height={550} alt="img" src={require("../assets/sample.png")} />
                        <Carousel.Caption>
                            <h2>BUCKET LIST ULTIMA</h2>
                            <h2>"BLU"</h2>
                            <h3>The Ultimate Bucket List Maker!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={1280} height={550} alt="img" src={require("../assets/sample.png")} />
                        <Carousel.Caption>
                            <h3>What Do You Want To Do?</h3>
                            <h4>Track Your Life Goals</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={1280} height={550} alt="img" src={require("../assets/sample.png")} />
                        <Carousel.Caption>
                            <h3>What Do You Want To Do?</h3>
                            <h4>Share your Achievements with Friends</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img width={1280} height={550} alt="img" src={require("../assets/sample.png")} />
                        <Carousel.Caption>
                            <h3>What Do You Want To Do?</h3>
                            <h4>Follow Your Friends' Achievements</h4>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Row>
            <Row hidden={this.state.register} bsStyle="primary">
                <Col md={6} mdOffset={3}>
                    <Panel>
                        <h2>Create New Account</h2>
                        <form id="register-form" onSubmit={this.submitRegister.bind(this)}>
                            <ControlLabel><h4>Enter your username:</h4></ControlLabel><br />
                            <FormControl type="text" onChange={this.handleChange.bind(this)} id="name" placeholder="Username" />
                            <br />
                            <ControlLabel><h4>Enter your email:</h4></ControlLabel><br />
                            <FormControl type="text"  onChange={this.handleChange.bind(this)} id="email" placeholder="Email" />
                            <br />
                            <label><h4>Enter your password:</h4></label><br />
                            <FormControl type="password" onChange={this.handleChange.bind(this)} id="password" placeholder="Password" />
                            <br />
                            <Button type="submit" onClick={()=>{this.handleSubmit('register')}}>Submit</Button>
                        </form>
                    </Panel>
                </Col>
            </Row>
            <Row hidden={this.state.login} bsStyle="primary">
                <Col md={6} mdOffset={3}>
                <Panel>
                <h2>Log in to your account</h2>
                <form id="login-form" onSubmit={this.submitLogin.bind(this)}>
                    <ControlLabel>Enter your email:</ControlLabel><br />
                    <FormControl type="text" onChange={this.handleChange.bind(this)} id="email" placeholder="Email" />
                    <br />
                    <label>Enter your password:</label><br />
                    <FormControl type="password" onChange={this.handleChange.bind(this)} id="password" placeholder="Password" />
                    <br />
                    <Button type="submit">Submit</Button>
                </form>
                <br />
                <p>Already logged in? Go to your <Link to="/bucketlists/">Bucketlists</Link></p>
            </Panel>
                </Col>
            </Row>
        </Grid>
        );
    }
}
