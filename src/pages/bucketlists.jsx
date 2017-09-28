import React from 'react';
import { Modal, Button } from 'react-bootstrap';

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
            description: "",
            show_modal: false,
            editid: null,
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
        if(this.state.editid){
            bucketlistactions.editBucketlist(this.state.editid, payload);
            this.close();
        }else{
            //throw in the token and call for a create-bucketlist action
            bucketlistactions.createBucketlist(payload);
        }        
    }
    handleDelete(id){
        bucketlistactions.deleteBucketlist(String(id));
    }
    handleView(id, name){
        //route to the retrieved list view
        var url = '/bucketlists/'+id+'/items';
        localStorage.setItem('list_id', id);
        localStorage.setItem('list_name', name);
        window.location = url;
    }
    handleEdit(id, name, date, description, cond){
        //open modal with the edit-bucketlist form
        this.setState({
            show_modal: cond,
            editid: id,
            name: name,
            date: date,
            description: description
        });
    }
    close(){
        this.setState({
            show_modal: false,
            editid: null,
            name: "",
            date: "",
            description: ""
        });
        document.getElementById("create-list-form").reset();
    }
    render(){
        let bucketlists = this.state.user_bucketlists;
        console.log("captured lists: ", bucketlists);
        const BucketlistArray = bucketlists.map(bucketlist => {
            return(
                <div key={bucketlist.id}>
                    <Bucketlist key={bucketlist.id} bucketlistdata={bucketlist} />
                    <button onClick={()=>{this.handleView(bucketlist.id, bucketlist.name)}}>View</button> | <button onClick={()=>{this.handleEdit(bucketlist.id, bucketlist.name, bucketlist.date, bucketlist.description, true)}}>Edit</button> | <button onClick={()=>{this.handleDelete(bucketlist.id)}}>Delete</button>
                    <br />
                    ----------------------------------
                </div>
            );
        });
        return (
            <div>
                <h2>Create New Bucketlist</h2>
                <form id="create-list-form" onSubmit={this.handleSubmit.bind(this)}>
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
                <Modal show={this.state.show_modal} onHide={this.close.bind(this)}>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit {this.state.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Enter name:</label><br />
                        <input type="text" onChange={this.handleChange.bind(this)} id="name" placeholder={"name: "+this.state.name} />
                        <br />
                        <label>Enter date:</label><br />
                        <input type="text" onChange={this.handleChange.bind(this)} id="date" placeholder={"ddmmyyyy: "+this.state.date} />
                        <br />
                        <label>Enter description:</label><br />
                        <input type="text" onChange={this.handleChange.bind(this)} id="description" placeholder={"description: "+this.state.description} />
                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Submit</Button> | <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </form>
                </Modal>
            </div>
        );
    }
}