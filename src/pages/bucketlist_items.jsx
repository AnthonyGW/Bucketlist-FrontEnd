import React from 'react';

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
            description: ""
        };
    }
    componentWillMount(){
        this.setState({bucketlist_id:localStorage.getItem('list_id')});
        ItemStore.retrieveItems(this.state.bucketlist_id);
        ItemStore.on('change', () => {
            this.setState({
                bucketlist_name: ItemStore.getName(),
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
        //throw in the token and call for a create-item action
        itemactions.createItem(payload);
    }
    handleDelete(id){
        itemactions.deleteItem(String(id));
    }
    render(){
        let bucketlistItems = this.state.bucketlist_items;
        console.log("captured items: ", bucketlistItems);
        const ItemArray = bucketlistItems.map(item => {
            return(
                <div key={item.id}>
                    <Item key={item.id} itemdata={item} />
                    <button>Edit</button> | <button onClick={()=>{this.handleDelete(item.id)}}>Delete</button>
                    <br />
                    ----------------------------------
                </div>
            );
        });
        return (
            <div>
                <h2>Add New Activity</h2>
                <form onSubmit={this.handleSubmit.bind(this)}>
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
            </div>
        );
    }
}