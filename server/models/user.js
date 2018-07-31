/*
Note: need to use next() to catch async errors. In a sync function throwing an error in the middleware will work because it will be caught as the parent function wouldn't have returned yet. In an async function the parent function(the middleware) would have returned and then error would not be caught by anything and thus will just crash the program
https://thecodebarbarian.com/80-20-guide-to-express-error-handling
*/

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    }
});

userSchema.pre("save", async function(next) {
    try {
        if(!this.isModified("password")){
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch(err) {
        return next(err); 
    }
}); //This is a pre hook

userSchema.methods.comparePassword = async function(candidatePassword, next) { //everything is async so need to tell express when to move on to next middleware thats why we need to use the next function
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err)
    }
    
}

const User = mongoose.model("User", userSchema);

module.exports = User;