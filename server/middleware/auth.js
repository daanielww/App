require("dotenv").load();
const jwt = require("jsonwebtoken");

// make sure the user is logged - Authentication
exports.loginRequired = function(req,res,next) {
    try { //try/catch bc if token empty the split will return type error and will crash shit
        const token = req.headers.authorization.split(" ")[1] //get the stuff after 'Bearer'
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded) {
                return next();
            } else {
                return next({
                    status: 401, //unauthorized status code
                    message: "Please log in first"
                });
            }
        });
    } catch (e) {
        return next({
            status: 401,
            message: "Please log in first"
        });
    }
};

// /api/users/:id/messages
//make sure we get the correct user - Authorization
exports.ensureCorrectUser = function(req,res,next) {
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if(decoded && decoded.id === req.params.id){
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Unauthorized"
                });
            }
        });
    } catch (e) {
        return next({
            status: 401,
            message: "Incorrect User"
        });
    }
}