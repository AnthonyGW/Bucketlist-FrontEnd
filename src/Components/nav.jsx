import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component{
    constructor(){
        super();
        this.state = {
            collapsed : true,
        }
    }

    toggleCollapse(){
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }
    render(){
        const { location } = this.props.history.location;
        const { collapsed } = this.state;
        // const indexClass = location.pathname === '/' ? 'active' : '';
        const registerClass = location.pathname === '/register' ? 'active' : '';
        const loginClass = location.pathname === '/login' ? 'active' : '';
        const navClass = collapsed ? 'collapse' : '';

        return(
            <nav class="navbar navbar-default">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} aria-expanded="false">
                            <span class="sr-only"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span> 
                        </button>
                        {/* <a class="pull-left" href="{{ url_for('index') }}"><img src="{{ url_for('static', filename='images/newlogo_lg.png') }}" alt="Logo" class="logo-large" style="width:60px; height:50px;"></a> */}
                    </div>

                    <div class={"navbar-collapse" + navClass} id="IndexNavbar">
                        <ul class="nav nav-pills pull-right">
                            <li class={registerClass}>
                                <Link to="/register" onClick={this.toggleCollapse.bind(this)}>Create Account</Link>
                            </li>
                            <li class={loginClass}>
                                <Link to="/login" onClick={this.toggleCollapse.bind(this)}>Log In</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}