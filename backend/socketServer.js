const io = require("./server").io;

// listener
io.on('connection', socket=>{
    console.log(socket.id, "has connected")
})
