const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
exports.localFileUpload = async(req,res) => {
    try{
        //fetch file from request
    const file = req.files.file;
    console.log("File Aagyi Jee -> ",file);
    //create path where file need to be stored on server
    let path = __dirname + "/files" + Date.now()+`.${file.name.split('.')[1]}`;
    console.log("Path-> ",path);
    //move file on path defined
    file.mv(path,(err)=>{
        console.log(err);
    });
    //send a response
    res.json({
        success:true,
        message:'Local file Uploaded Successfully',
    });
    }
    catch(error){
   console.log(error);
    }
}
function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type);
}
async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}
//image uploader handler
exports.imageUpload = async(req,res) => {
    try{
    const {name,tags,email} = req.body;
    console.log(name,tags,email);
    const file = req.files.imageFile;
    console.log(file);
    //Validation
    const supportedTypes = ["jpg","jpeg","png"];
    const fileType = file.name.split('.')[1].toLowerCase();
    console.log("File Type:",fileType);
    if(!isFileTypeSupported(fileType,supportedTypes)){
        return res.status(400).json({
            success:false,
            message:'File format not supported',
        })
    }
    //file format supported hai
    const response = await uploadFileToCloudinary(file,"Codehelp");
    console.log(response);
    //db mai entry save krni hai
    const fileData = await File.create({
        name,tags,email,
        imageUrl:response.secure_url,
    })
    res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'Image successfully uploaded on cloudinary',
    })
    }
    catch(error){
    console.error(error);
    res.status(400).json({
        success:false,
        message:'Faced issues while uploading image to cloudinary',
    });
    }
}

//video upload handler
exports.videoUpload = async(req,res) => {
    try{
     const {name,tags,email} = req.body;
     console.log(name,tags,email);

     const file = req.files.videoFile;
     const supportedTypes = ["mp4","mov"];
     const fileType = file.name.split('.')[1].toLowerCase();
     console.log("File Type:",fileType);
     if(!isFileTypeSupported(fileType,supportedTypes)){
        return res.status(400).json({
            success:false,
            message:'File format not supported',
        })
     }
     const response = await uploadFileToCloudinary(file,"Codehelp");
     console.log(response); 
     //db mai entry save krni hai
     const fileData = await File.create({
        name,tags,email,
        imageUrl:response.secure_url,
     })
     res.json({
        success:true,
        message:'Video Successfully uploaded on Cloudinary',
     });
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong while uploading video on cloudinary',
        })
    }
}


exports.imageSizeReducer = async(req,res) => {
   try{
    const {name,tags,email} = req.body;
    console.log(name,tags,email);
    const file = req.files.imageFile;
    console.log(file);
    //Validation
    const supportedTypes = ["jpg","jpeg","png"];
    const fileType = file.name.split('.')[1].toLowerCase();
    console.log("File Type:",fileType);
    if(!isFileTypeSupported(fileType,supportedTypes)){
        return res.status(400).json({
            success:false,
            message:'File format not supported',
        })
    }
    //file format supported hai
    const response = await uploadFileToCloudinary(file,"Codehelp",90);
    console.log(response);
    //db mai entry save krni hai
    const fileData = await File.create({
        name,tags,email,
        imageUrl:response.secure_url,
    })
    res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'Image successfully uploaded on cloudinary',
    })
   }
   catch(error){
    console.error(error);
    res.status(400).json({
        success:false,
        message:'Error while uploading image by reducing its size',
    })
   }
}