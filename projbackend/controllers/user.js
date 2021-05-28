const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error:"Cannot find User in DB"
            })
        }
        req.profile = user;
        next();
    });
}

exports.getUser = (req, res) => {
    //these fields are only getting undefined in user profile and
    //not in database.
    req.profile.salt = undefined;
    req.profile.enc_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(403).json({
                    error: "Error in Updation"  
                })
            }
            user.salt = undefined;
            user.enc_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user)
        }
    )
}

exports.userPurchaseList = (req, res) => {
    Order.find({_id: req.profile._id})
    .populate("user","_id name")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "Error in finding Order"
            })
        }
        res.json(order)
    })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.object.amount,
            transaction_id: req.body.object.transaction_id
        });
    });

    //pushing in the DB
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchases) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to save purchase List"
                })
            }
            next()
        }
    )
}
