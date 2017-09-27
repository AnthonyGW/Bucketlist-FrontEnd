import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

// import Nav from './Components/nav';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import UserBucketlists from './pages/bucketlists';
import * as authactions from './actions/authactions';

const app = document.getElementById('root');

class Point extends React.Component{
    handleLogout(){
        authactions.logout();
    }
    render(){
    return(
    <Router>
        <div>
            <h1>Bucket List Ultima</h1>
            {/* <Link to="/">Home .</Link> */}
            <Link to="/register">. Create Account .</Link>
            <Link to="/login">. Log In .</Link>
            <Link to="/bucketlists">. Bucketlists .</Link>
            <button onClick={()=>{this.handleLogout()}}>Log out</button>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/bucketlists/" component={UserBucketlists} />
        </div>
    </Router>);
    };
};
ReactDOM.render(<Point />, app);
