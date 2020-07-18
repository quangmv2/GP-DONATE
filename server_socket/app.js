require('dotenv').config()
const io = require('socket.io')(9000);
const Redis = require('ioredis');
const { data } = require('jquery');
const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    family: 4,
    password: process.env.REDIS_PASSWORD,
    db: 0
});

console.log('Socket 9000');

io.on('error', (err) => {
    console.log('err', err);
});

io.on('connection', (socket) => {
    console.log('new connet', socket.id);
    socket.on('watch-post', (data) => {
        const { id } = data;
        socket.join(`watch-post:${id}`);
    });
});

io.use(function(socket, next) {
    var token = socket.request;
    next();
});



const commentPush = (event, data) => {
    const {post_id} = data;
    io.to(`watch-post:${post_id}`).emit(event, data);
}


redis.psubscribe("*",function(error,count){
	//
})
redis.on('pmessage',function(partner,channel,message){
	console.log(channel)
	console.log(message)
	console.log(partner)

	message = JSON.parse(message)
    const event = message.event;
    const {data} = message;
    switch (event) {
        case 'new-comment':
            commentPush(event, data.message)
            break;
        case 'delete-comment':
            commentPush(event, data.message)
            break;
        default:
            break;
    }
})
