const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrders, deleteOrder } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser,newOrder)
router.route("/orders/me").get(isAuthenticatedUser,myOrders)
router.route("/orders/:id").get(isAuthenticatedUser,getSingleOrder)

router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders)
router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrders)
router.route("/admin/order/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder)



module.exports = router;