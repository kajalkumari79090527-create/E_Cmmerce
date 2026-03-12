const db = require("../config/db")

exports.addCart = (req,res)=>{

const user_id = req.user.id
const {product_id} = req.body

db.query(
"INSERT INTO cart(user_id,product_id) VALUES(?,?)",
[user_id,product_id],
(err,result)=>{

res.json("Added to cart")

})

}

exports.getCart = (req,res)=>{

const user_id = req.user.id

db.query(
`SELECT products.*,cart.id as cart_id
FROM cart
JOIN products ON cart.product_id = products.id
WHERE cart.user_id=?`,
[user_id],
(err,result)=>{

res.json(result)

})

}

exports.removeCart = (req,res)=>{

const id = req.params.id

db.query(
"DELETE FROM cart WHERE id=?",
[id],
(err,result)=>{

res.json("Removed")

})

}