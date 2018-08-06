import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import {addError, removeError} from "./errors";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function authUser(type, userData) {
  return dispatch => {
    // wrap our thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => { //dont actually need 2 promises bc in api.js we alrdy wrapped the axios call in a promise so we can just use that promise to handle errors. In reality all the error handling has alrdy been taken care of in api.js so we only need to do a .then to add functionality after the call has been completed. If api call not completed successfully the axios promise would have been rejected in api.js
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          dispatch(setCurrentUser(user));
          dispatch(removeError())
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
          dispatch(addError(err.message))
          reject(); // indicate the API call failed
        });
    });
  };
}