import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import {addError, removeError} from "./errors";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout(){ //dispatch which causes an action rerenders the views. so the homepage goes back to normal as the isAuthenticated property is changed and jwt tokens removed so goes back to default homepage
  return dispatch => {
    localStorage.clear(); //removes the jwt token and then sets the state again so user not logged in anymore
    dispatch(setCurrentUser({})) //sets current user with an empty user object so the reducer will make isAuthenticated false
  }
}

export function authUser(type, userData) {
  return dispatch => {
    // wrap our thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => { //dont actually need 2 promises bc in api.js we alrdy wrapped the axios call in a promise so we can just use that promise to handle errors. In reality all the error handling has alrdy been taken care of in api.js so we only need to do a .then to add functionality after the call has been completed. If api call not completed successfully the axios promise would have been rejected in api.js
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          dispatch(setCurrentUser(user)); //makes isAuthenticated true bc the user object won't be empty
          dispatch(removeError());
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
          dispatch(addError(err.message)) //getting the error msg that is returned back from api call
          reject(); // indicate the API call failed
        });
    });
  };
}