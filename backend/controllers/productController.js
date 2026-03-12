const db = require("../config/db")

exports.getProducts = (req,res)=>{

db.query(
"SELECT * FROM products",
(err,result)=>{

if(err) return res.json(err)

res.json(result)

})

}

exports.getProduct = (req,res)=>{

const id = req.params.id

db.query(
"SELECT * FROM products WHERE id=?",
[id],
(err,result)=>{

res.json(result[0])

})

}

exports.addProduct = (req,res)=>{

const {name,price,description,category} = req.body

const image = req.file.filename

db.query(
"INSERT INTO products(name,price,description,image,category) VALUES(?,?,?,?,?)",
[name,price,description,image,category],
(err,result)=>{

res.json("Product Added")

})

}
exports.deleteProduct = (req,res)=>{

const id = req.params.id

db.query(
"DELETE FROM products WHERE id=?",
[id],
(err,result)=>{

res.json("Product Deleted")

})

}