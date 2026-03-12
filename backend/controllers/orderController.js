const db = require("../config/db")

exports.createOrder = (req,res)=>{

const user_id = req.user.id
const {total} = req.body

db.query(
"INSERT INTO orders(user_id,total,status) VALUES(?,?,?)",
[user_id,total,"Pending"],
(err,result)=>{

res.json("Order Created")

})

}

exports.getOrders = (req,res)=>{

const user_id = req.user.id

db.query(
"SELECT * FROM orders WHERE user_id=?",
[user_id],
(err,result)=>{

res.json(result)

})

}