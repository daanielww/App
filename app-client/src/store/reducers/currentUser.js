import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false, //hopefully be true when user logged in
    user: {} //all the user info when logged in
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                //turn empty object into false or if there are keys, true. basically checking if length is 0 or not bc 0 is false
                isAuthenticated: !!Object.keys(action.user).length, 
                user: action.user
            };
        default:
            return state;
    }
};