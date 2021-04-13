import mongoose from 'mongoose';
// const mongoose = require("mongoose");
import { ObjectId } from mongoose.Schema;


//We can also create this schema in different file.
//this is to show that two schema in a file is also a way of 
// defining schemas.
const OrderSchema = mongoose.Schema({
    products: [ProductInCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    },
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

const ProductInCartSchema = mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product",
    },
    name: String,
    price: Number,
    count: Number

}, { timestamps: true });

const ProductInCart = mongoose.model("ProductInCart", ProductInCartSchema);

module.exports = { Order, ProductInCart };