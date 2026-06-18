const {redisClient} = require('../config/redisClient');
const cach = async(req,res,next)=>{
    const data = await redisClient.get('adminProducts');
    if(data){
        return res.json(JSON.parse(data));
    }
    next();
}
module.exports = cach