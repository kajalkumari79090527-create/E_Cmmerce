const db = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req,res)=>{
console.log(req.body)
const {name,email,password} = req.body

const hash = bcrypt.hashSync(password,10)

db.query(
"INSERT INTO users(name,email,password) VALUES(?,?,?)",
[name,email,hash],
(err,result)=>{

if(err) return res.json(err)

res.json("User Registered")

})

}

exports.login = (req,res)=>{

const {email,password} = req.body

db.query(
"SELECT * FROM users WHERE email=?",
[email],
(err,result)=>{

if(result.length==0){
return res.json("User not found")
}

const valid = bcrypt.compareSync(password,result[0].password)

if(!valid){
return res.json("Wrong Password")
}

const token = jwt.sign(
{id:result[0].id},
"secretkey"
)

res.json({
token,
user:result[0]
})

})

}