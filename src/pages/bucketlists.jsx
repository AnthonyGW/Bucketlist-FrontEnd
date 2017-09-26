import React from 'react';

import Bucketlist from '../components/bucketlist';
import BucketlistStore from '../stores/BucketlistStore';
import * as bucketlistactions from '../actions/bucketlistactions';

export default class UserBucketlists extends React.Component{
    constructor(){
        super();
        this.state = {
            user_bucketlists: [],
            name: "",
            date: "",
            description: ""
        };
    }
    componentWillMount(){
        BucketlistStore.retrieveBucketlists(localStorage.getItem("token"));
        BucketlistStore.on('change', () => {
            this.setState({
                user_bucketlists: BucketlistStore.getAll()});
        });
    }
    handleChange(event){
        //Validate the date
        this.setState({
         [event.target.id]: event.target.value,
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const payload = {
            "name" : this.state.name,
            "date" : this.state.date,
            "description": this.state.description
        }
        //throw in the token and call for a create-bucketlist action
        bucketlistactions.createBucketlist(payload);
    }
    handleDelete(id){
        console.log("onclick", id);
        bucketlistactions.deleteBucketlist(String(id));
    }
    render(){
        let bucketlists = this.state.user_bucketlists;
        console.log("captured lists: ", bucketlists);
        const BucketlistArray = bucketlists.map(bucketlist => {
            return(
                <div key={bucketlist.id}>
                    <Bucketlist key={bucketlist.id} bucketlistdata={bucketlist} />
                    <button>View</button> | <button>Edit</button> | <button onClick={()=>{this.handleDelete(bucketlist.id)}}>Delete</button>
                    <br />
                    ----------------------------------
                </div>
            );
        });
        return (
            <div>
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
                <h1> My Bucketlists </h1>
                <ul>{BucketlistArray}</ul>
                <br />
            </div>
        );
    }
}