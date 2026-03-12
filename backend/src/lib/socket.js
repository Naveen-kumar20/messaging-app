import express from 'express'
import http from "http";
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL
    }
})

//used to store online users
const userSocketMap = {} //{userId: socketId}

export const getReceiverSocketId = (userId)=>{
    return userSocketMap[userId]
}

io.on('connection', (socket) => {
    console.log('🟢 New user connected', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id
    }

    //sending event to all connected client, for showing every single person that is online with tag 'online'
    io.emit('getOnlineUsers', Object.keys(userSocketMap)) //sending just the userId -> the same id that is stored in mongodb

    socket.on('disconnect', () => {
        console.log("🔴 A user disconnected", socket.id);
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})

export { io, app, server }