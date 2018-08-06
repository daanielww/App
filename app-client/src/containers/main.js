import React from "react";
import {Switch, Route, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/authForm";


const Main = props => {
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" render={props => <Homepage {...props}/>}/>
                <Route exact path="/signin" render={props => {
                    return(
                        <AuthForm buttonText="Log in" heading="Welcome Back." {...props}/>
                    )
                }}/>
                <Route exact path="/signup" render={props => {
                    return(
                        <AuthForm buttonText="Sign me Up" heading="Join Now." signUp {...props}/>
                    )
                }}/>
            </Switch>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

export default withRouter(connect(mapStateToProps,null)(Main));