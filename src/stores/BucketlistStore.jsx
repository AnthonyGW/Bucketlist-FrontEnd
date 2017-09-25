import { EventEmitter } from 'events';
import axios from 'axios';

import dispatcher from '../dispatcher';

class BucketlistStore extends EventEmitter{
    constructor(){
        super();
        this.bucketlists = [
            {
                user: 'None',
                id: 'null',
                name: 'Default List',
                date: '00000000',
                description: 'Default blank bucketlist'
            },
        ];
    }

    createBucketlist(token,payload){
        const fullToken = 'Bearer ' + token;
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/bucketlists/',
            withCredentials: false,
            headers: {'Authorization': fullToken},
            data: payload
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
        console.log(error);
        });
    }
    getAll(){
        return this.bucketlists;
    }
    retrieveBucketlists(token){
        // var bucketlistsData;
        const fullToken = 'Bearer ' + token;        
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/bucketlists/',
            withCredentials: false,
            headers: {'Authorization': fullToken}
        }).then((response) => {
            this.bucketlists = response.data;
            // bucketlistsData = response.data;
        }).catch((error) => {
        console.log(error);
        });
        // this.emit('change');
        // return bucketlistsData;
    }
    handleActions(action){
        console.log("Bucketlist Store received an action", action);
        switch(action.type){
            case "CREATE_BUCKETLIST": {
                this.createBucketlist(action.token, action.payload);
                break;
            }
            case "FETCH_BUCKETLISTS": {
                this.bucketlists = this.retrieveBucketlists(action.token);
                break;
            }
            case "LOAD_BUCKETLISTS": {
                return this.getAll();
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