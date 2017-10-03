import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import Home from './pages/home';
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
            <Route exact path="/" component={Home} />
            <Route path="/auth/logout" />
            <Route path="/auth/reset-password" />
            <Route exact path="/bucketlists/" component={UserBucketlists} />
            <Route path="/bucketlists/:bucketlistId/items/" component={BucketlistItems} />
        </div>
    </Router>);
    };
};
ReactDOM.render(<Point />, app);
