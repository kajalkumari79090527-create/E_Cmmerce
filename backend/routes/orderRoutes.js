const router = require("express").Router()
const orderController = require("../controllers/orderController")
const auth = require("../middleware/authMiddleware")

// create order
router.post("/create", auth, orderController.createOrder)

// get user orders
router.get("/", auth, orderController.getOrders)

module.exports = router