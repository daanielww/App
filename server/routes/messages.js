const express = require("express");
const router = express.Router({mergeParams:true});

const {createMessage, getMessage, deleteMessage} = require("../handlers/messages");

//need to start with / bc we are gonna prefix it with /api/users/:id/messages. the prefix is already enough 
//so don't need much for the route here
router.route("/").post(createMessage);

router.route("/:message_id").get(getMessage).delete(deleteMessage);

module.exports = router; 