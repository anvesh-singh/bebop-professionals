const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

require("dotenv").config();
exports.protect = async(req,res,next) => {
    try{
     let token;
     if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
     ){
        try{
        token = req.headers.authorization.split(" ")[1];
        //decodes token id
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
       
        req.user = await User.findById(decoded.id).select("-password");
        
        next();

        }catch(error){
            console.log(error);
            return res.status(401).json({
                success:false,
                message:'Not Authorized,Token Failed',
            });
        }
     }
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success:false,
            message:'Not Authorized,No Token',
        });
    }
}