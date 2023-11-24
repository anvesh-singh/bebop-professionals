const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require ("dotenv").config();
// const generateToken = require("../config/generateToken");
//  exports.registerUser = async(req,res) =>{
// try{
//     const {name,email,password,pic} = req.body;
// if(!name || !email || !password){
//    return  res.status(404).json({
//         success:false,
//         message:'Please Fill All The Required Fields',
//     });
// }
// const existingUser = await User.findOne({email});
// if(existingUser){
//    return  res.status(400).json({
//         success:false,
//         message:'user already exist',
//     });
// }
// const user = await User.create({
//     name,
//     email,
//     password,
//     pic,
// })
// console.log(user);
// return res.status(200).json({
//     success:true,
//     message:'User created successfully',
//     user,
//     // token:generateToken.generateToken(user._id),
// });
// //console.log("Token->",token);
// }
// catch(error){
// return res.status(400).json({
// success:false,
// message:error.message,
// });
// }
// }

// exports.login = async(req,res) => {
//     try{
//      const {email,password} = req.body;
//      const user = await User.findOne({email});
//      if(user && (await user.matchPassword(password))){
//         return res.status(200).json({
//             success:true,
//             message:'Login Successfully',
//             user,
//         })
//      }
//     }
//     catch(error){
//    console.log(error);
//    return res.status(400).json({
//     success:false,
//     message:'Something went wrong while login',
//    })
//     }
// }

exports.signup = async(req,res) => {
    try{
    //data fetch from request body
  const{
    name,
    email,
    password,
    pic,
  } = req.body;

    //validate krlo
    if(!name || !email || !password){
        return res.status(403).json({
            success:false,
            message:'Plz enter complete details'
        })
    }

    //check user already exist or not

   const existingUser = await User.findOne({email});
  if(existingUser){
    return res.status(400).json({
        success:false,
        message:'User Already Exist'
    });
  }
    //hash Password
  const hashedPassword = await bcrypt.hash(password,10);
  const user = await User.create({
    name,
    email,
    password:hashedPassword,
    // image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
  })
    //return res
   return res.status(200).json({
    success:true,
    message:'User Registered Successfully',
    user,
    });
    }
    catch(error){
    console.log(error);
    return res.status(500).json({
    success:false,
    message:'User cannot Registered Successfully,Plz try Again',
    });
    }
}
exports.login = async(req,res) => {
    try{
    //get data from req body
    const {email,password} = req.body;
    //validation data
    if(!email || !password){
        return res.status(403).json({
            success:false,
            message:'All fields are required,please try again later',
        });
    }
    //user check exist or not
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            success:false,
            message:'User is not registered,plz signup first',
        })
    }
    //password match generate JWT Token
    if(await bcrypt.compare(password,user.password)){
        const payload = {
            email:user.email,
            id:user._id,
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h",
        });
        user.token = token;
        user.password = undefined;
        //create cookie
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token",token,options).status(200).json({
        success:true,
        token,
        user,
        message:'Logged in Successfully',
        })

    }
    else{
        return res.status(401).json({
            success:false,
            message:'Password is Incorrect',
        });
    }
    }
    catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:'Login Failure,Plz try again',
    });
    }
}
exports.allUsers = async(req,res) => {
    try{
    const keyword = req.query.search ? {
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}},
        ]
    }:{};

    const allUsersFetched = (await User.find(keyword));   // .find({_id:{$ne: req.user._id}})
    res.send(allUsersFetched);
    // return res.status(200).json({
    //     success:true,
    //     messsage:'Required Users fetched successfully',
    //     users,
    // });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Unable to get All Users',
        });
    }
}


exports.allMessage = async(req,res) => {
    try{
    const messages = await MessageChannel.find({chat:req.params.chatId})
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

