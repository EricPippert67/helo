const initialState ={
    username:'',
    peopleId: 0,
    profile: ''
}

const USER_INFO = 'USER_INFO';
const LOGOUT_USER = 'LOGOUT_USER';

export function userInfo(userObj){
    return{
        type: USER_INFO,
        payload: userObj
    }
}
export function logoutUser(){
    return{
        type: LOGOUT_USER,
        payload: {}
    }
}
export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case USER_INFO:
            return{...state, user: payload};
        case LOGOUT_USER:
            return{...state, user: payload};
        default:
            return state;
    }


}
