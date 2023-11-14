const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    tags:{
        type:String,
        required:true,
    },
    email:{
   type:String,
   required:true,
    },
});
//post middleware
fileSchema.post("save",async function(doc){
    try{
    console.log("DOC",doc);
    //transporter
    let transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
        },
    });
    //send mail
    let info = await transporter.sendMail({
        from:`Dhakad - by malav`,
        to:doc.email,
        subject:"New File Uploaded on Cloudinary",
        html:`<h2>Hello Jee</h2><p>File Uploaded View here:<a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
    })
    console.log("INFO",info);
    }
    catch(error){
     console.error(error);
    }
})
module.exports = mongoose.model("File",fileSchema);