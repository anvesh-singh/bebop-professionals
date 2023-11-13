const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async(req,res) =>{
    try{
    //get data
    const {dateOfBirth="",about="",contactNumber,gender} = req.body;
    //get userId
    const id = req.user.id;
    //validation
    if(!contactNumber || !gender || !id){
        return res.status(400).json({
            success:false,
            message:'All Fields Are Required',
        });
    }
    //findProfile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    //updateProfile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();
    //return response
    return res.status(200).json({
        success:true,
        message:'Profile Details Updated Successfully',
        profileDetails,
    });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error while updating profile Details',
            error:error.message,
        });
    }
};

//delete account
//explore -> how can we schedule this deletion
exports.deleteAccount = async(req,res) => {
    try{
    //get id
    const id = req.user.id;
    //validation
    const userDetails = await User.findById(id);
    if(!userDetails){
        return res.status(404).json({
            success:false,
            message:'User not Found',
        });
    }
    //delete from first
    await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
    //user delete user
    await User.findByIdAndDelete({_id:id});
    //enroll user from all enrolled courses
    //return res
    return res.status(200).json({
        success:true,
        message:'User Deleted Successfully',
    });
    }
    catch(error){
  console.log(error);
  return res.status(500).json({
    success:false,
    message:'Error while deleting an User',
    error:error.message,
  });
    }
};
exports.getAllUserDetails = async(req,res)=>{
    try{
    const id = req.user.id;
    const userDetails = await User.findById(id).populate("additionalDetails").exec();
    if(!userDetails){
        return res.status(404).json({
            success:false,
            message:'User not Found',
        });
    }
    return res.status(200).json({
        success:true,
        message:'User Details fetched Successfully',
        userDetails,
    });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error while fetching all user details',
            error:error.message,
        });
    }
};