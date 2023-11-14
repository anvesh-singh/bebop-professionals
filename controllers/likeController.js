const Like = require("../models/likeModel");
const Post = require("../models/postModel");
exports.likePost = async(req,res) =>{
    try{
     const {post,user} = req.body;
     const like = new Like(
        {
         post,user,
        }
     );
 const savedLike = await like.save();
 //update post collection basis on this
 const updatedPost = await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true})
   .populate("likes")
   .exec();
 res.json({
    post:updatedPost,
 });
    }
    catch(error){
    return res.status(500).json({
        error:"Error while liking a post",
    });
    }
};
//unlike a Post
exports.unlikePost = async(req,res) => {
    try{
    const {post,like} = req.body;
    //find and delete like collection
    const deletedLike = await Like.findOneAndDelete({post:post,_id:like});
    //update the post collection
    const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true}); //likes ke andr se iss id ko delete krna hai
    res.json({
        post:updatedPost,
    });

    }
    catch(error){
     return res.status(500).json({
        error:"Error while unliking a Post",
     })
    }
};
exports.dummyLink = (res,red) => {
    res.send("This is your Dummy Page");
};