const express = require("express");
const app = express();

const userRoutes = require("./routes/User");


const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http:localhost:3000",
        credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)
//connect to cloudinary
cloudinaryConnect();
app.use("/api/v1/auth",userRoutes);
//file routes
const FileUpload = require("./routes/FileUpload");
app.use("/api/v1",FileUpload);

//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'Your server is up and running...'
    });
});

app.listen(PORT,()=>{
    console.log(`App running at ${PORT}`)
})