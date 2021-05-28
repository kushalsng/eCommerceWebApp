const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthentic } = require("../controllers/auth");

const { getToken, processPayment } = require("../controllers/paymentb");


router.get('/payment/gettoken/:userId', isSignedIn, isAuthentic, getToken)

router.post("/payment/braintree/:userId", isSignedIn, isAuthentic, processPayment)



module.exports = router