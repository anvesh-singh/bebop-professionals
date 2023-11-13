const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//send otp
exports.sendotp = async(req,res) => {
try{
    //fetch email from req ki body
    const {email} = req.body;
    //check if user already exist
    const checkUserPresent = await User.findOne({email});

    //if user already exist ,then return a response
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:'User already registered',
        })
    }
    //otp generate
   var otp =otpGenerator.generate(6,{
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false,
   });
   console.log("OTP generated" , otp);
   //check unique otp or not
   let result = await OTP.findOne({otp: otp});
   while(result){
    otp = otpGenerator(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    result = await OTP.findOne({otp: otp});
   }
   //create entry of otp in database
   const otpPayload = {email,otp};
   const otpBody = await OTP.create(otpPayload);
   console.log(otpBody);
   //return response
   res.status(200).json({
    success:true,
    message:'OTP  Successfully Sent',
    otp,
   })
}
catch(error){
 console.log(error);
 return res.status(500).json({
    success:false,
    message:error.message,
 })
}

};

//signup
exports.signup = async(req,res) => {
    try{
    //data fetch from request body
  const{
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    accountType,
    contactNumber,
    otp
  } = req.body;

    //validate krlo
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            message:'Plz enter complete details'
        })
    }
    //check dono password matching or not
   if(password !== confirmPassword){
    return res.status(400).json({
        success:false,
        message:'Password and ConfirmPassword values does not match,Plz try again'
    });
   }

    //check user already exist or not

   const existingUser = await User.findOne({email});
  if(existingUser){
    return res.status(400).json({
        success:false,
        message:'User Already Exist'
    });
  }

    //find most recent OTP stored for the user

    const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOTP);
    //validate OTP
  if(recentOTP.length == 0){
    //OTP not found
    return res.status(400).json({
        success:false,
        message:'OTP NOT FOUND'
    })
  }
  else if(otp !== recentOTP){
    //Invalid otp
    return res.status(400).json({
      success:false,
      message:'OTP NOT MATCHING'  
    });
  }


    //hash Password
  const hashedPassword = await bcrypt.hash(password,10);

    //entry create in DB
    const ProfileDetails = await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
    });
  const user = await User.create({
    firstName,
    lastName,
    email,
    contactNumber,
    password:hashedPassword,
    accountType,
    additionalDetails:ProfileDetails._id,
    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
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

//login
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
    const user = await User.findOne({email}).populate("additionalDetails");
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
            accountType:user.accountType,
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

//password Change
exports.changePassword = async(req,res) => {
    //get data from rq body
    //get oldPassword,newPassword,confirmPassword
    //validation
    //update pwd in DB
    //send mail - Password updated
    //return response
}