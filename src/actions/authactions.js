import dispatcher from '../dispatcher';

export function setAuthToken(authToken){
    dispatcher.dispatch({
        type: 'SET_TOKEN',
        newtoken: authToken
    });
}

export function resetAuthToken(){
    dispatcher.dispatch({
        type: 'RESET_TOKEN',
    });
    dispatcher.dispatch({
        type: 'FETCH_BUCKETLISTS',
    });
    setTimeout(() => {
        dispatcher.dispatch({
            type: 'LOAD_BUCKETLISTS'
        });
    }, 1000);

}

export function logout(){
    dispatcher.dispatch({
        type: 'LOG_OUT'
    });
}