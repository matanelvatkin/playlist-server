const jwt=require('jsonwebtoken');
const { errMessage, sendError } = require('./errController');
const secret = process.env.SECRET

const createToken = (email) =>{
    const token = jwt.sign({email}, secret, {expiresIn: "1d"})
    if(!token) throw errMessage.CAN_NOT_CREATE_TOKEN
    return token
}



const validToken = async (req, res, next)=> {
    try{
        var result = jwt.verify(req.headers.authorization.replace('Bearer ', ''), secret, {expiresIn : '1d'})
        if(!result.email) throw errMessage.UNAUTHORIZED
        req.email = result.email
        next();
    } 
    catch(e){
        sendError(res,errMessage.UNAUTHORIZED)
    }  
}





module.exports = {createToken, validToken}