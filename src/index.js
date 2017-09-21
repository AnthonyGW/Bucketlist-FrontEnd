import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import history from './history';

// import Nav from './Components/nav';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';

const app = document.getElementById('root');

class Point extends React.Component{
    render(){
    return(
    <Router>
        <div>
            <h1>Bucket List Ultima</h1>
            {/* <Link to="/">Home .</Link> */}
            <Link to="/register">. Create Account .</Link>
            <Link to="/login">. Log In .</Link>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
        </div>
    </Router>);
    };
};
ReactDOM.render(<Point />, app);
