var express = require('express')
var router = express.Router()
const { check } = require("express-validator")
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post("/signup",[
    check("name").isLength({min: 4})
    .withMessage("Name must be atleast 4 characters long"),

    check("email").isEmail()
    .withMessage("Invalid Email"),

    check("password")
    .isLength({min: 5})
    .withMessage("password must be atleast 5 characters long")
    .matches(/\d/)
    .withMessage("password must contain a digit"),
], signup);

router.post("/signin",[
    // check("name").isLength({min: 4})
    // .withMessage("Name must be atleast 4 characters long"),

    check("email").isEmail()
    .withMessage("Invalid Email"),

    check("password")
    .isLength({min: 5})
    .withMessage("password must be atleast 5 characters long")
    .matches(/\d/)
    .withMessage("password must contain a digit"),
], signin);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
    res.json(req.authy)
})

module.exports = router;