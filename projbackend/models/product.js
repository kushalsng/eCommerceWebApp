import mongoose from 'mongoose'
import { ObjectId } from mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        trim: true
    },
    price: {
        type: Number,
        maxlength: 32,
        required: true,
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    photo: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);