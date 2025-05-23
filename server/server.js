import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
const app = express()

const server = http.createServer(app)
const io = new Server(server , {
    cors:{
        origin:'*',
    }
})

io.on('connection',(socket) =>{
    console.log(`User is connected with ID : ${socket.id}`)

   socket.on('send_message',(msg) => {
    console.log(msg)
    socket.broadcast.emit('receive_message',msg)
   })

   socket.on('new_user',(data) => {
    socket.broadcast.emit('user_joined',data.user)
   })

   socket.on('user_typing',(data) => {
    socket.broadcast.emit('user_typing',data)
   })
})


server.listen(5000,()=>{
    console.log('server is running')
})
