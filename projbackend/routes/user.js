const express = require("express");
const router = express.Router();

const { 
    getUserById,
    getUser,
    updateUser,
    userPurchaseList
} = require("../controllers/user");
const { isSignedIn, isAuthentic, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthentic, getUser);

router.put("/user/:userId", isSignedIn, isAuthentic, updateUser)

router.get("/user/order/:userId", isSignedIn, isAuthentic, userPurchaseList)

module.exports = router;