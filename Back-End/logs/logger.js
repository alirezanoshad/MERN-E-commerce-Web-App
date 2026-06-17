// logging data using winston logger
const winston = require('winston');
const {combine,timestamp,printf} = winston.format;
const logger = winston.createLogger({
    level:'info',
    format: combine(
        timestamp(),
        printf((info)=> `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports:[
        new winston.transports.File({filename:'info.log',level:'info'}),
        new winston.transports.File({filename:'error.log',level:'error'})
    ]
})
module.exports = logger