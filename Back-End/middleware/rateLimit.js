const {rateLimit} = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, //every 15 min
	limit: 10, // 10 try
	message:'too many attemps', // the message to show
});
module.exports = limiter