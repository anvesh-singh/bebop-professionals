const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
//resetPasswordToken
exports.resetPasswordToken = async(req,res) =>{
try{
    //get email from req ki body
    const email = req.body.email;
    //check user for this email,email validation
    const user = await User.findOne({email:email});
    if(!user){
        return res.json({
            success:false,
            message:'Your Email is not registered with us'
        });
    }
    //generate token
    const token = crypto.randomUUID();
    //update user by additing token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
        {email:email},
        {
            token:token,
            resetPasswordExpires:Date.now()+ 5*60*1000,
        },
        {new:true}
    );

    //create url
    const url = `http://localhost:3000/update-password/${token}`
    //send mail containing the url
    await mailSender(email,"Password Reset Link",
    `Password Reset Link: ${url}`
    );
    //return response
   return res.json({
    success:true,
    message:'Email sent Successfully,Plz check and update',
   });
}
catch(error){
 console.log(error);
 return res.status(500).json({
    success:false,
    message:'Something ent wrong while resetting Password'
 });
}

    
}

//resetPassword
exports.resetPassword = async (req,res)=>{
    try{
   //data fetch
   const {password,confirmPassword,token} = req.body;

   //validation
   if(password !== confirmPassword){
    return res.json({
        success:false,
        message:'Password and confirmPassword Not Matching',
    });
   }

   //get userDetails from db using token
   const userDetails = await User.findOne({token:token});
   //if no entry-invalid token
   if(!userDetails){
    return res.json({
        success:false,
        message:'Token is invalid',
    });
   }
   //token time expires
   if(userDetails.resetPasswordExpires < Date.now()){
    return res.json({
        success:false,
        message:'Token is expired,please regenerate your token',
    });
   }
   //hash password
const hashedPassword = await bcrypt.hash(password,10);

   //password update
   await User.findOneAndUpdate(
    {token:token},
    {password:hashedPassword},
    {new:true},
   )
   //return response
   return res.status(200).json({
    success:true,
    message:'Password reset Successfully',
   });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
           success:false,
           message:'Something went wrong while resetting Password',
        });
    }
}