const router = require("express").Router()
const cartController = require("../controllers/cartController")
const auth = require("../middleware/authMiddleware")

router.post("/add",auth,cartController.addCart)
router.get("/",auth,cartController.getCart)
router.delete("/:id",auth,cartController.removeCart)

module.exports = router