const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{

const token = req.headers.authorization

if(!token){
return res.status(401).json("No Token")
}

try{

const verified = jwt.verify(token,"secretkey")

req.user = verified

next()

}catch(err){

res.status(400).json("Invalid Token")

}

}

module.exports = authMiddleware