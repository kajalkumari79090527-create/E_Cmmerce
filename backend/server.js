const express = require("express")
const cors = require("cors")

const app = express()   // ✅ create app first

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")

const multer = require("multer")

const storage = multer.diskStorage({
destination: function(req,file,cb){
cb(null,"uploads/")
},
filename: function(req,file,cb){
cb(null,Date.now()+"-"+file.originalname)
}
})

const upload = multer({storage:storage})

app.use("/uploads",express.static("uploads"))

app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/orders",orderRoutes)

app.listen(5000,()=>{
console.log("Server running on port 5000")
})