const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error.js"); //If don't put a relative path express will always look in node modules folder by default

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

//all my routes

app.use(function(req,res,next) {
    let err = new Error("Page not found");
    err.status = 404;
    next(err); //passes err as parameter to the next handler. err is taken in as parameter in the errorHandler function in the next route
});

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`Server is starting on port ${PORT}`);
});
