const mongoose = require("mongoose");
//To import ObjectId from mongoose.Schema.
//All the following options work

//1
// const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId

//2
// const ObjectId = mongoose.Schema.Types.ObjectId

//3
const { ObjectId } = require("mongoose").Schema


//We can also create this schema in different file.
//this is to show that two schema in a file is also a way of 
// defining schemas.
const ProductInCartSchema = mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product",
    },
    name: String,
    price: Number,
    count: Number

}, { timestamps: true });

const OrderSchema = mongoose.Schema({
    products: [ProductInCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
        type: String,
        default: "Recieved",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    },
}, { timestamps: true });


const ProductInCart = mongoose.model("ProductInCart", ProductInCartSchema);
const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductInCart };