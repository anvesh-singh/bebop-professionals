const Chat = require("../models/chatModel");
const User = require("../models/userModel");
exports.accessChat = async(req,res) => {
    try{
    const {userId} = req.body;
    if(!userId){
        return res.status(200).json({
            sucess:false,
            message:'UserId param not sent with request',
        });
    }
    var isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq: req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}},
        ],
    })
    .populate("users","-password")
    .populate("latestMessage");
    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email",
    });
    if(isChat.length > 0){
       res.send(isChat[0]);
    }else{
        var chatData = {
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId],
        };
        try{
         const createdChat = await Chat.create(chatData);
         const FullChat = await Chat.findOne({_id:createdChat._id})
         .populate("users","-password");
         res.status(200).send(FullChat);
        }catch(error){
         console.log(error);
         return res.status(400).json({
            success:false,
            message:error.message,
         });
        }
    }
    }catch(error){
     console.log(error);
     return res.status(400).json({
        success:false,
        message:'Unable to access chat',
     });
    }
}

exports.fetchChats = async(req,res) => {
    try{
    Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
    .populate("users","-password")
    .populate("groupAdmin","-password")
    .populate("latestMessage")
    .sort({updatedAt:-1})
    .then(async(results)=>{
        results = await User.populate(results,{
            path:"latestMessage.sender",
            select:"name pic email",
        });
        res.status(200).send(results);
    });
    //.then((result)=>res.send(result));
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Unable to find All Chats', 
        });
    }
}

exports.createGroupChat = async(req,res) => {
    try{
  //const {users,name} = req.body;
  if(!req.body.users || !req.body.name){
    return res.status(400).json({
        success:false,
        message:'Please fill all required Fields',
    });
    }
    var users = JSON.parse(req.body.users);
    if(users.length < 2){
        return res.status(400).json({
            success:false,
            message:'More than 2 users are required to form a group chat',
        });
    }
    users.push(req.user);
    
    const groupChat = await Chat.create({
        chatName:req.body.name,
        users:users,
        isGroupChat:true,
        groupAdmin:req.user,
    });
    const fullGroupChat = await Chat.findOne({_id:groupChat._id})
    .populate("users","-password")
    .populate("groupAdmin","-password");
    const dbSave = await Chat.create(fullGroupChat);
    return res.status(200).json({
        success:true,
        message:'Group Chat Created Successfully',
        fullGroupChat,
    });
  
  
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to create GroupChat',
        });
    }
}

exports.renameGroup = async(req,res) => {
    try{
    const {chatId,chatName} = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(chatId,{
        chatName:chatName,
    },
    {new:true,}
    ).populate("users","-password")
    .populate("groupAdmin","-password");
    if(!updatedChat){
        return res.status(400).json({
            success:false,
            message:'Chat Not Found',
        });
    }else{
        return res.status(200).json({
            success:true,
            message:'Group Name Updated Successfully',
            updatedChat,
        });
    }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Unable to update a group name',
        });
    }
}


exports.removeFromGroup = async(req,res) => {
    try{
   const {chatId,userId} = req.body;
   const deleted = await Chat.findByIdAndUpdate(chatId,
    {
        $pull: {users:userId},
    },
    {
        new:true,
    }).populate("users","-password")
    .populate("groupAdmin","-password");
    if(!deleted){
        return res.status(400).json({
            success:false,
            message:'Unable to find the user in the group'
        });
    }else{
        return res.status(200).json({
            success:true,
            message:'User removed from group successfully',
            deleted,
        });
    }
    }
    catch(error){
   console.log(error);
   return res.status(500).json({
    success:false,
    message:'Unable to remove user from group',
   });
    }
}

exports.addToGroup = async(req,res) => {
    try{
    const {chatId,userId} = req.body;
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
           $push: {users:userId},
        },
        {
            new:true,
        }
    ).populate("users","-password")
    .populate("groupAdmin","-password");
    if(!added){
        return res.status(400).json({
            success:false,
            message:'Chat Not Found',
        });
    }else{
        return res.status(200).json({
            success:true,
            message:'Added to Group Successfully',
            added,
        });
    }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Unable to Add To Group',
        });
    }
}