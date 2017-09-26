import { EventEmitter } from 'events';
import axios from 'axios';

import dispatcher from '../dispatcher';

class ItemStore extends EventEmitter{
    constructor(){
        super();
        this.items = [];
        this.token = "";
        this.bucketlist_id = "";
        this.bucketlist_name = "";
        this.bucketlists_url = "http://bucketlistultimaapi.herokuapp.com/bucketlists/"
        this.url = ""
    }

    createItem(token, payload){
        const fullToken = 'Bearer ' + localStorage.getItem("token");
        axios({
            method: 'post',
            url: this.url,
            withCredentials: false,
            headers: {'Authorization': fullToken},
            data: payload
        }).then((response) => {
            console.log(response.data);
            this.retrieveItems(token);
        }).catch((error) => {
            console.log(error);
        });
    }
    getAll(){
        console.log("stored items: ", this.items);
        return this.items;
    }
    getUrl(){
        return this.state.url;
    }
    getName(){
        return this.bucketlist_name;
    }
    getId(){
        return this.bucketlist_id;
    }
    flushStore(){
        this.items = [];
        this.emit('change');
    }
    retrieveItems(id, name){
        const fullToken = 'Bearer ' + localStorage.getItem("token");
        this.bucketlist_id = localStorage.getItem('list_id');
        this.bucketlist_name = name;
        this.url = this.bucketlists_url+this.bucketlist_id+'/items';
        axios({
            method: 'get',
            url: this.url,
            withCredentials: false,
            headers: {'Authorization': fullToken}
        }).then((response) => {
            console.log("get response", response.data);
            this.items = response.data;
            console.log("fetched items", this.items);
            this.emit('change');
        }).catch((error) => {
            console.log(error);
            if(error.response.status === 404){
                console.log("flushing store...");
                this.flushStore();
            }
        });
    }
    deleteItem(item_id){
        const fullToken = 'Bearer ' + localStorage.getItem("token");        
        axios({
            method: 'delete',
            url: this.url+"/"+item_id,
            withCredentials: false,
            headers: {'Authorization': fullToken},
        }).then((response) => {
            console.log(response.data);
            this.retrieveItems(this.bucketlist_id, this.bucketlist_name);
        }).catch((error) => {
            console.log(error);
        });
    }

    handleActions(action){
        console.log("Item Store received an action", action);
        switch(action.type){
            case "CREATE_ITEM": {
                this.createItem(localStorage.getItem("token"), action.payload);
                break;
            }
            case "FETCH_ITEMS": {
                this.retrieveItems(action.id, action.name);
                break;
            }
            case "LOAD_ITEMS": {
                return this.getAll();
            }
            case "DELETE_ITEM": {
                this.deleteItem(action.id);
                break;
            }
            default:{
                console.log('Item action has no handling');
                break;
            }
        }
    }
}

const itemStore = new ItemStore();
dispatcher.register(itemStore.handleActions.bind(itemStore));
export default itemStore;