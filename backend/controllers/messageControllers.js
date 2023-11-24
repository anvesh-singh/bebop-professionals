const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

exports.sendMessage = async(req,res) => {
    try{
    const {content,chatId} = req.body;

    if(!content || !chatId){
        return res.status(400).json({
            success:false,
            message:'Please fill all the required fields',
        });
    }

    // const checkChatId = await Chat.find({_id:chatId});
    // if(!checkChatId){
    //     return res.status(400).json({
    //         success:false,
    //         message:'User does not exist with given Id',
    //     });
    // }
    var newMessage = {
        sender:req.user._id,
        content:content,
        chat:chatId,
    };

    var message = await Message.create(newMessage);
    message = await message.populate("sender","name pic");
    message = await message.populate("chat");
    message = await User.populate(message,{
        path:"chat.users",
        select:"name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId,{
        latestMessage:message,
    });
    
    return res.status(200).json({
        success:true,
        message:'Message sent Successfully',
        message,
    });
    }catch(error){
   console.log(error);
   return res.status(500).json({
    success:false,
    message:'Failed to send Message',
   });
    }
}

exports.allMessage = async(req,res) => {
    try{
    const messages = await Message.find({chat:req.params.chatId})
    .populate("sender","name pic email")
    .populate("chat");
    res.json(messages);


    }catch(error){
       console.log(error);
       return res.status(500).json({
        success:false,
        message:'Unable to fetch all messages',
       });
    }
}