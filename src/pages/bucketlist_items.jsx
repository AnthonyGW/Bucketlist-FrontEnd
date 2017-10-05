import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import Item from '../components/item';
import ItemStore from '../stores/ItemStore';
import * as itemactions from '../actions/itemactions';

export default class BucketlistItems extends React.Component{
    constructor(){
        super();
        this.state = {
            bucketlist_name: "",
            bucketlist_id: "",
            bucketlist_items: [],
            name: "",
            description: "",
            show_modal: false,
            editid: null,
        };
    }
    componentWillMount(){
        this.setState({
            bucketlist_id: localStorage.getItem('list_id'),
            bucketlist_name: localStorage.getItem('list_name')
        });
        ItemStore.retrieveItems(this.state.bucketlist_id, this.state.bucketlist_name);
        ItemStore.on('change', () => {
            this.setState({
                bucketlist_id: ItemStore.getId(),
                bucketlist_items: ItemStore.getAll()});
        });
    }
    handleChange(event){
        //Validate the date
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const payload = {
            "name" : this.state.name,
            "description": this.state.description
        }
        if(this.state.editid){
            itemactions.editItem(this.state.editid, payload);
            this.close();
        }else{
            //throw in the token and call for a create-item action
            itemactions.createItem(payload);
        }
    }
    handleDelete(id){
        itemactions.deleteItem(String(id));
    }
    handleEdit(id, name, description, cond){
        //open modal with the edit-bucketlist form
        this.setState({
            show_modal: cond,
            editid: id,
            name: name,
            description: description
        });
    }
    close(){
        this.setState({
            show_modal: false,
            editid: null,
            name: "",
            description: ""
        });
        document.getElementById("create-item-form").reset();        
    }
    render(){
        let bucketlistItems = this.state.bucketlist_items;
        console.log("captured items: ", bucketlistItems);
        const ItemArray = bucketlistItems.map(item => {
            return(
                <div key={item.id}>
                    <Item key={item.id} itemdata={item} />
                    <button onClick={()=>{this.handleEdit(item.id, item.name, item.description, true)}}>Edit</button> | <button onClick={()=>{this.handleDelete(item.id)}}>Delete</button>
                    <br />
                    ----------------------------------
                </div>
            );
        });
        return (
            <div>
                <h2>Add New Activity</h2>
                <form id="create-item-form" onSubmit={this.handleSubmit.bind(this)}>
                    <label>Enter name:</label><br />
                    <input type="text" onChange={this.handleChange.bind(this)} id="name" placeholder="name" />
                    <br />
                    <label>Enter description:</label><br />
                    <input type="text" onChange={this.handleChange.bind(this)} id="description" placeholder="description" />
                    <br />
                    <input type="submit" />
                </form>
                <h1> {this.state.bucketlist_name} Items </h1>
                <ul>{ItemArray}</ul>
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