import dispatcher from '../dispatcher';

export function createBucketlist(authToken, payload){
    dispatcher.dispatch({
        type: 'CREATE_BUCKETLIST',
        token: authToken,
        payload: payload
    });
}

export function deleteBucketlist(authToken, id){
    dispatcher.dispatch({
        type: 'DELETE_BUCKETLIST',
        id: id
    });
}

export function reloadBucketlists(authToken){
    dispatcher.dispatch({
        type: 'FETCH_BUCKETLISTS',
        token: authToken
    });
    setTimeout(() => {
        dispatcher.dispatch({
            type: 'LOAD_BUCKETLISTS'
        });
    }, 1000);
}
