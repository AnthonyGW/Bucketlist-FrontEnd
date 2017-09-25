import React from 'react';

// import Bucketlist from '../components/bucketlist';
import BucketlistStore from '../stores/BucketlistStore';
import tokenStore from '../stores/TokenStore';
import * as bucketlistactions from '../actions/bucketlistactions';
// import * as authactions from '../actions/authactions';

export default class UserBucketlists extends React.Component{
    constructor(){
        super();
        this.state = {
            authToken: tokenStore.getToken(),
            bucketlists: BucketlistStore.bucketlists,
            name: "",
            date: "",
            description: ""
        };
    }
    componentWillMount(){
        BucketlistStore.on('change', () => {
             this.setState({
                 bucketlists: bucketlistactions.reloadBucketlists(this.state.authToken)
            })
        });
        tokenStore.on('change', () => {
            this.setState({
                authToken: tokenStore.getToken()
            });
        });
    }
    handleChange(event){
        //Validate the email format
        this.setState({
         [event.target.id]: event.target.value,
        });
        console.log(this.state.authToken);
    }
    handleSubmit(e){
        e.preventDefault()
        const payload = {
            "name" : this.state.name,
            "date" : this.state.date,
            "description": this.state.description
        }
        //throw in the token and call for a create-bucketlist action
        bucketlistactions.createBucketlist(this.authToken, payload);
    }
    render(){
        //call for a reload-bucketlists action
        // this.state.bucketlists = bucketlistactions.reloadBucketlists(this.authToken);
        // this.loadBucketlists();
        const { bucketlists } = this.state.bucketlists;
        // const BucketlistComponents = bucketlists.map((bucketlist) => {
        //     return <Bucketlist key={bucketlist.id}{...bucketlist} />;
        // });
        const BucketlistComponents = bucketlists;
        return (
            <div>
                <h1> My Bucketlists </h1>
                <ul>{BucketlistComponents}</ul>
                <br />
                <h2>Create New Bucketlist</h2>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>Enter name:</label><br />
                    <input type="text" onChange={this.handleChange.bind(this)} id="name" placeholder="name" />
                    <br />
                    <label>Enter date:</label><br />
                    <input type="text"  onChange={this.handleChange.bind(this)} id="date" placeholder="ddmmyyyy" />
                    <br />
                    <label>Enter description:</label><br />
                    <input type="text" onChange={this.handleChange.bind(this)} id="description" placeholder="description" />
                    <br />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}