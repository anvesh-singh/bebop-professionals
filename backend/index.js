const express = require("express");
const app = express();


const connect = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
require("dotenv").config();
app.use(express.json());
connect.connect();

app.get("/",(req,res)=>{
    res.send("API is Running");
});
app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,console.log(`SERVER successfully started at PORT ${PORT}`));
const io = require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000",
    },
});
io.on("connection",(socket) => {
    console.log("connected to socket.io");
    socket.on("setup",(userData)=>{
    socket.join(userData._id);
    socket.emit("connected");
    })
});
