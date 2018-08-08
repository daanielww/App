require("dotenv").config(); //loads any environment variables onto process.env
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error.js"); //If don't put a relative path express will always look in node modules folder by default
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const {loginRequired, ensureCorrectUser} = require("./middleware/auth");
const db = require("./models");
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

//all my routes
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages",loginRequired,ensureCorrectUser, messagesRoutes);

app.get("/api/messages", loginRequired, async function(req, res, next){
    try {
        let messages = await db.Message.find()
        .sort({createdAt: "desc"})
        .populate("user", {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(messages);
    } catch(err) {
        return next(err);
    }
})

app.use(function(req,res,next) {//no route is specified so can be triggers on any route thats why you needa put it last.
    let err = new Error("Page not found");
    err.status = 404;
    next(err); //passes err as parameter to the next handler. err is taken in as parameter in the errorHandler function in the next route
});

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
});
