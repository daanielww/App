const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema(
    {
        text:{
            type: String,
            required: true,
            maxLength:160
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" //this field needs to match up perfectly with the name of our model
        }

    },
    {
        timestamps:true
    }
)

messageSchema.pre('remove', async function(next){   
    try{
        //find a user
        let user = await User.findById(this.userId);
        //remove the id of the message from their messages list
        user.message.remove(this.id);
        //save that user
        await user.save();
        //return next
        return next(); //return next() so can continue onto next middleware so can actually do the removing of the message. this is a pre hook so happens right before the remove. This function removes message from the user struct then the actual remove removes the actual message entry.
    }catch(e){
        return next(err)
    }

})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message;
