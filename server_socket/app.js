require('dotenv').config()
const io = require('socket.io')(9000);

console.log('Socket 9000');

io.on('error', (err) => {
    console.log('err', err);
});

io.on('connection', (socket) => {
    console.log('new connet', socket.id);
});

io.use(function(socket, next) {
    var token = socket.request;
    // console.log(token);
    next();
});

const Redis = require('ioredis');
const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    family: 4,
    password: process.env.REDIS_PASSWORD,
    db: 0
});

redis.psubscribe("*",function(error,count){
	//
})
redis.on('pmessage',function(partner,channel,message){
	console.log(channel)
	console.log(message)
	console.log(partner)

	message = JSON.parse(message)
    io.emit(channel+":"+message.event,message.data.message)
    io.emit('test', message.data);
	console.log('Sent')
})
