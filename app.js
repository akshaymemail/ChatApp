import express from 'express'
import { Server } from 'socket.io'

// create app
const app = express()

// static file
app.use(express.static('public'))

// create server
const server = app.listen(3000, () => {
    console.log("Server is running at port 3000")
})

// socket setup
const io = new Server(server)

io.on('connection', (socket) => {
    console.log('connected!')

    // listen for chat emit
    socket.on('chat', data => {
        io.sockets.emit('chat', data)
    })
    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })
})
