const initialState ={
    username:'',
    peopleId: 0,
    profile: ''
}

const USER_INFO = 'USER_INFO';
const RESET_USER_INFO = 'RESET_USER_INFO';

export function userInfo(userObj){
    return{
        type: USER_INFO,
        payload: userObj
    }
}
export function resetUserInfo(){
    return{
        type: RESET_USER_INFO,
        payload: initialState
    }
}
export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case USER_INFO:
            return{...state, user: payload};
        case RESET_USER_INFO:
            return{...state, user: payload};
        default:
            return state;
    }


}
