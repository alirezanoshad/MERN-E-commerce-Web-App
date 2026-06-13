const {body} = require('express-validator');

const registerValidator = ()=>{
    return[
        body('name').notEmpty().withMessage('name is required').matches(/^[^'"`?!#%$*(){}[\]]+$/).withMessage('you cant put symbols'),
        body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email is not valid'),
        body('password').notEmpty().withMessage('password cant be empty')
    ]
}
const loginValidator = ()=>{
    return[
        body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email is not valid'),
        body('password').notEmpty().withMessage('password cant be empty')
    ]
}
module.exports = {registerValidator,loginValidator}