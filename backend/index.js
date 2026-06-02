import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

socket.emit('welcome',`${socket.id} Welcome to the server.`)

  socket.on("disconnect",()=>{
    console.log('User Disconnected.',socket.id)
  })

  socket.on("message",({Id,message})=>{
    io.to(Id).emit("receive-message",message)
    console.log({Id,message})  
  })

  socket.on("join-room",(room) => {
    socket.join(room)
    console.log(`User joined The Room ${room}`)
  })

});


server.listen(3000, () => {
  console.log("Server running on port 3000");
});  

