import http from"http"
import express from "express";
import { Server } from "socket.io";
import app from "./index.js"



const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: "*",
    }
})
io.on("coonecet",(soket) =>{
   
})
