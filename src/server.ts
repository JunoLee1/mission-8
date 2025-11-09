import http from "http";
import express from "express";
import { Server } from "socket.io";
import app from "./index.js"

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;


const io = new Server(server,{
    cors:{
        origin: "*",
    }
})
io.on("coonection",(socket) =>{
    // TODO add handler   
   
})


server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});