const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/app", {
    keepAlive: true,
    useMongoClient: true
});

