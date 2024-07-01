// express and socket.io server
const fs = require("fs")
const https = require("https")
const express = require("express")
const socketio = require("socket.io")
const cors = require("cors"); 

const app = express()
app.use(cors()) // open-up our express server to any domain
app.use(express.static(__dirname + '/public'))
app.use(express.json()) // allow us to parse json in the body with the body parser

const key = fs.readFileSync('./certs/create-cert-key.pem');
const cert = fs.readFileSync('./certs/create-cert.pem')

const expressServer = https.createServer({key, cert}, app);

const io = socketio(expressServer, {
    cors: ['https://localhost:4000', 'https://localhost:4001', 'https://localhost:3001']
})

expressServer.listen(5000, ()=>{
    console.log("server started")
})
module.exports = {io, expressServer, app}