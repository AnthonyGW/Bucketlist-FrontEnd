import dispatcher from '../dispatcher';

// export function getAuthToken(){
//     dispatcher.dispatch({
//         type: 'GET_TOKEN'
//     });
// }

export function setAuthToken(authToken){
    dispatcher.dispatch({
        type: 'SET_TOKEN',
        newtoken: authToken
    });
}
