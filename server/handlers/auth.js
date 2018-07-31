const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next){
    //finding a user
    //checking if their password matches what was sent to the server
    //if it all matches then log them in
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        if (user.username != req.body.username) {
            return next({
                status: 400,
                message: "Incorrect Username"
            });
        }
        let { id, username, profileImageUrl} = user 
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch) { 
            let token = jwt.sign(
                {
                    id,
                    username,
                    profileImageUrl
                }, 
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status:400,
                message: "Invalid Email/Password"
            })
        } 
    }catch(err) {
        return next({
            status:400,
            message: "Invalid Email"
        })
    }
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
        });
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