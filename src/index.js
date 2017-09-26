import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import UserBucketlists from './pages/bucketlists';
import BucketlistItems from './pages/bucketlist_items';
import * as authactions from './actions/authactions';

const app = document.getElementById('root');

class Point extends React.Component{
    handleLogout(){
        authactions.logout();
        window.location = '/auth/login';
    }
    render(){
    return(
    <Router>
        <div>
            <h1>Bucket List Ultima</h1>
            {/* <Link to="/">Home .</Link> */}
            <Link to="/auth/register">. Create Account .</Link>
            <Link to="/auth/login">. Log In .</Link>
            <Link to="/bucketlists">. Bucketlists .</Link>
            <button onClick={()=>{this.handleLogout()}}>Log out</button>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth/register" component={Register} />
            <Route exact path="/auth/login" component={Login} />
            <Route path="/auth/logout" />
            <Route path="/auth/reset-password" />
            <Route exact path="/bucketlists/" component={UserBucketlists} />
            <Route path="/bucketlists/:bucketlistId/items/" component={BucketlistItems} />
        </div>
    </Router>);
    };
};
ReactDOM.render(<Point />, app);
