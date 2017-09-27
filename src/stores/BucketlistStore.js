import { EventEmitter } from 'events';
import axios from 'axios';

import dispatcher from '../dispatcher';

class BucketlistStore extends EventEmitter{
    constructor(){
        super();
        this.bucketlists = [];
        this.token = "";
        this.bucketlists_url = "http://bucketlistultimaapi.herokuapp.com/bucketlists/"
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
    retrieveBucketlists(token){
        const fullToken = 'Bearer ' + localStorage.getItem("token");
        axios({
            method: 'get',
            url: this.bucketlists_url,
            withCredentials: false,
            headers: {'Authorization': fullToken}
        }).then((response) => {
            console.log("get response", response.data);
            this.bucketlists = response.data;
            this.bucketlists.reverse();
            console.log("fetched lists", this.bucketlists);
            this.emit('change');
        }).catch((error) => {
            console.log(error);
            this.flushStore();
            // if(error === undefined){
            //     this.flushStore();
            // }
            // else if(error.response.status === 404){
            //     this.flushStore();
            // }
            // else
            // {
            //     this.flushStore();
            // }
        });
    }
    deleteBucketlist(token, id){
        const fullToken = 'Bearer ' + localStorage.getItem("token");        
        axios({
            method: 'delete',
            url: this.bucketlists_url+id,
            withCredentials: false,
            headers: {'Authorization': fullToken},
        }).then((response) => {
            console.log(response.data);
            this.retrieveBucketlists(token);
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
            window.location='/auth/login';
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
                this.deleteBucketlist(localStorage.getItem("token"), action.id);
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