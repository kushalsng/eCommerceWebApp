const express = require("express");
const router = express.Router();

const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateOrder,
} = require("../controllers/order");
const { isSignedIn, isAuthentic, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

//parmas
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthentic,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

//Read
router.get("/order/all/:userId", isSignedIn, isAuthentic, getAllOrders);

//Update
//Status getting route
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthentic,
  isAdmin,
  getOrderStatus
);
//updating status.
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthentic,
  isAdmin,
  updateOrder
);

module.exports = router;
