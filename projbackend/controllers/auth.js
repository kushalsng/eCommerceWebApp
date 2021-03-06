const { validationResult } = require("express-validator");
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")

exports.signup = (req, res) => {

    //Validation of inputs
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err:"NOT able to add User to the DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "USER doesn't exist"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        //creating token
        const token = jwt.sign({_id: user._id}, process.env.SECRET);
        //putting token in cookie of browser
        res.cookie("token", token, {expire: new Date() + 9999});

        //send response to front end
        const { _id, name, email, role } = user;
        res.json({token, user: { _id, name, email, role}});
    })
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message:"User is signed out!!"
    });
};

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "authy"
});


//custom middlewares
exports.isAuthentic = (req, res, next) => {
    let checker = req.profile && req.authy && req.profile._id == req.authy._id;
    // let checker = req.profile._id;
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED!"
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error:"You are not admin, Access Denied"
        })
    }
    next();
};
