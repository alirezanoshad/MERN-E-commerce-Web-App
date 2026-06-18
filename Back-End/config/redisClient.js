const redis = require('redis');

const redisClient = redis.createClient({
    socket: {
        host: '127.0.0.1',
        port: 6379
    },
    RESP: 2
});

redisClient.on('error', (err) => {
    console.log('Redis Error:', err);
});

redisClient.on('ready', () => {
    console.log('Redis ready');
});

const connectRedis = async () => {
    await redisClient.connect();
};

module.exports = {
    connectRedis,
    redisClient
};