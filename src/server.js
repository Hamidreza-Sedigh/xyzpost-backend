const express =  require('express');
const mongoose = require('mongoose');
const cors =     require('cors');
const routes =   require('./routes');
const path =     require('path');
const http =     require('http');
const socketio = require('socket.io')
const Port = process.env.PORT || 8000


const app =      express();
const server = http.Server(app);
const io = socketio(server); 

if(process.env.NODE_ENV !== 'production' ){
    require('dotenv').config()
}

try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('MOngoDB connected...');
} catch (error) {
    console.log('ERROR DB NOT CONNECT');
    console.log(error);
}

// better useing reddis
const connectUsers = {  };

io.on('connection', socket => {
    console.log(socket.handshake.query)
    const { user } = socket.handshake.query;

    connectUsers[user] = socket.id;
    
    //console.log('user is connected.', socket.id)
    //io.emit('hamid', {data: "hello-world"})
});

//app.use();
app.use((req, res, next)=> {
    req.io = io;
    req.connectUsers = connectUsers;
    return next();
});
app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "files")));
app.use(routes);

//app.listen(Port, ()=>{  // it was without socket
server.listen(Port, ()=>{   // with socket
    console.log(`Listen on ${Port}`)
    
})