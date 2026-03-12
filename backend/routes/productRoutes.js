const router = require("express").Router()
const productController = require("../controllers/productController")
const multer = require("multer")

const storage = multer.diskStorage({
destination:"uploads/",
filename:(req,file,cb)=>{
cb(null,Date.now()+"-"+file.originalname)
}
})

const upload = multer({storage})

router.post("/add",upload.single("image"),productController.addProduct)

router.get("/",productController.getProducts)

router.delete("/:id",productController.deleteProduct)

module.exports = router