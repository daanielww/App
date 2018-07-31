const db = require("../models");



exports.createMessage = async function(req, res, next){
    try{
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id)
        foundUser.messages.push(message.id);
        await foundUser.save()
        let foundMessage = await db.Message.findById(message.id).populate("user", { //fills the user field in message with the user object that has the id of req.params.id. Only populates the username and profileImageUrl fields.
            username:true,
            profileImageUrl: true
        });
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
};

// GET /api/users/:id/messages/:message_id
exports.getMessage = async function(req, res, next){
    try{
        let message = await db.Message.find(req.params.message_id);
        return res.status(200).json(message);
    } catch(e){
        return next(e);
    }
};

// Delete /api/users/:id/messages/:message_id
// note: findbyid and remove function in mongoose doesn't work with the pre hook
exports.deleteMessage = async function(req, res, next) { //
    try{
        let foundMessage = await db.message.findById(req.params.message._id)
        await foundMessage.remove()
        return res.status(200).json(foundMessage);
    } catch(e) {
        return next(e)
    }
};