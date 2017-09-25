import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class TokenStore extends EventEmitter{
    constructor(){
        super();
        this.token = "";
    }
    getToken(){
        return this.token;
    }
    setToken(newtoken){
        this.token = newtoken;
        this.emit('change');
    }
    handleActions(action){
        console.log("Token Store received an action", action);
        switch(action.type){
            // case "GET_TOKEN": {
            //     console.log('log of requested token', this.token);
            //     const mytoken = this.token;
            //     return mytoken;
            // }
            case "SET_TOKEN": {
                this.setToken(action.newtoken);
                break;
            }
            default:{
                console.log('Token action has no handling');
                break;
            }
        }
    }
}

const tokenStore = new TokenStore();
dispatcher.register(tokenStore.handleActions.bind(tokenStore));
export default tokenStore;