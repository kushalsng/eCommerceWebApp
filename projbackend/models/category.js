import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: 32,
    }
}, { timestamps: true })
//timestamp adds two field in the schema
//createdAt: this field will record the time of creation
//updatedAt: this field will record the time everytime we make
// an update.

module.exports = mongoose.model( "Category", categorySchema);