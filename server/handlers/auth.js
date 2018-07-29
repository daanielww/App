const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = function(){

};

exports.signup = async function(request, response, next){
    try {
        let user = await db.User.create(request.body);
        let {id, username, profileImageUrl} = user;
        let token = jwt.sign(
            {
                id,
                username,
                profileImageUrl 
            }, 
            process.env.SECRET_KEY
        );
        return response.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        })
        //create a user
        //create a token
        //process.env.SECRET_KEY
    } catch(err) {
        //if a validation fails! In the schema we indicated that the fields have to be unique so it will return error if an extry with the same fields already exist
        if(err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        })
        // see what kind of error
        //if it is a certain error
        //respond with username/email already taken
        //otherwise just send back a generic 400

    }
};