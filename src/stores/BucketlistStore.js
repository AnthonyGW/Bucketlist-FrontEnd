// src/stores/BucketlistStore.js
//
// This class is inherited from EventEmitter. EventEmitter has an 'on' method which can
// be used to detect actions that happen in an instance. 
// Use "this.emit('change')" to declare when an action has occurred.
// When referring to the class,call the class method "on('change', )" and insert some
// function to perform as the second argument.
import { EventEmitter } from 'events';

// import axios to send HTTP requests
import axios from 'axios';

// import dispatcher to register the store
import dispatcher from '../dispatcher';

class BucketlistStore extends EventEmitter{
    constructor(){
        super();
        this.bucketlists = [];
        this.token = "";
        this.bucketlists_url = "http://bucketlistultimaapi.herokuapp.com/bucketlists/"
        this.records_length = 0;
    }

    createBucketlist(token,payload){
        const fullToken = 'Bearer ' + localStorage.getItem("token");
        axios({
            method: 'post',
            url: this.bucketlists_url,
            withCredentials: false,
            headers: {'Authorization': fullToken},
            data: payload
        }).then((response) => {
            console.log(response.data);
            this.retrieveBucketlists(token);
        }).catch((error) => {
            console.log(error);
        });
    }

    getAll(){
        console.log("stored lists: ", this.bucketlists);
        return this.bucketlists;
    }

    flushStore(){
        this.bucketlists = [];
        this.emit('change');
    }

    retrieveBucketlists(token, queryParams=null){
        const fullToken = 'Bearer ' + localStorage.getItem("token");
        let queryURL = "?";        
        if(queryParams !== null && queryParams !== undefined){
            console.log("query parameters", queryParams);
            if(queryParams['limit']){
                queryURL = queryURL+"limit="+queryParams['limit'];
            }
            if(queryParams['page'] && queryURL !== "?"){
                queryURL = queryURL+"&page="+queryParams['page'];
            } else if(queryParams['page'] && queryURL === "?")
            {
                queryURL = queryURL+"page="+queryParams['page'];
            }
            if(queryParams['q'] && queryURL !== "?"){
                queryURL = queryURL+"&q="+queryParams['q'];
            } else if(queryParams['q'] && queryURL === "?")
            {
                queryURL = queryURL+"q="+queryParams['q'];
            }
        }

        axios({
            method: 'get',
            url: this.bucketlists_url+queryURL,
            withCredentials: false,
            headers: {'Authorization': fullToken}
        }).then((response) => {
            console.log("get response", response.data);
            this.bucketlists = response.data['bucketlists'];
            this.records_length = response.data['records_length'];
            console.log("fetched lists", this.bucketlists);
            this.emit('change');
        }).catch((error) => {
            console.log(error);
            this.flushStore();
        });
    }

    deleteBucketlist(token, id, page=null){
        const fullToken = 'Bearer ' + localStorage.getItem("token");        
        axios({
            method: 'delete',
            url: this.bucketlists_url+id,
            withCredentials: false,
            headers: {'Authorization': fullToken},
        }).then((response) => {
            console.log(response.data);
            this.retrieveBucketlists(token, page);
        }).catch((error) => {
            console.log(error);
        });
    }

    editBucketlist(token, id, payload){
        const fullToken = 'Bearer ' + localStorage.getItem("token");
        axios({
            method: 'put',
            url: this.bucketlists_url+id,
            withCredentials: false,
            headers: {'Authorization': fullToken},
            data: payload
        }).then((response) => {
            console.log(response.data);
            this.retrieveBucketlists(token);
        }).catch((error) => {
            console.log(error);
        });
    }

    getToken(){
        return localStorage.getItem("token");
    }

    setToken(newtoken){
        localStorage.setItem("token", newtoken);            
        this.token = newtoken;
        this.emit('change');
    }

    logout(){
        const fullToken = 'Bearer ' + localStorage.getItem("token");
        axios({
            method: 'post',
            url: 'http://bucketlistultimaapi.herokuapp.com/auth/logout',
            withCredentials: false,
            headers: {'Authorization': fullToken},
        }).then((response) => {
            console.log(response);
            this.flushStore();
        }).catch((error) => {
            console.log(error);
        });
    }

    handleActions(action){
        console.log("Bucketlist Store received an action", action);
        switch(action.type){
            case "CREATE_BUCKETLIST": {
                this.createBucketlist(localStorage.getItem("token"), action.payload);
                break;
            }
            case "FETCH_BUCKETLISTS": {
                this.retrieveBucketlists(localStorage.getItem("token"));
                break;
            }
            case "LOAD_BUCKETLISTS": {
                return this.getAll();
            }
            case "DELETE_BUCKETLIST": {
                this.deleteBucketlist(localStorage.getItem("token"), action.id, action.page);
                break;
            }
            case "EDIT_BUCKETLIST": {
                this.editBucketlist(localStorage.getItem("token"), action.id, action.payload);
                break;
            }
            case "SET_TOKEN": {
                this.setToken(action.newtoken);
                break;
            }
            case "RESET_TOKEN": {
                this.setToken(localStorage.getItem("token"));
                break;
            }
            case "LOG_OUT": {
                this.logout();
                break;
            }
            case "SEARCH_BUCKETLIST": {
                this.retrieveBucketlists(localStorage.getItem("token"), action.name);
                break;
            }
            default:{
                console.log('Bucketlist action has no handling');
                break;
            }
        }
    }
}

const bucketlistStore = new BucketlistStore();
dispatcher.register(bucketlistStore.handleActions.bind(bucketlistStore));
export default bucketlistStore;
