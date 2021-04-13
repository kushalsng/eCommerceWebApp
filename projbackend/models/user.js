import mongoose from "mongoose";
import crypto from "crypto";
import uuidv1 from "uuid/v1";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 64,
        trim: true
    },
    lastname: {
        type: String,
        required: false,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    enc_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, { timestamps: true });

userSchema.virtual('password')
.set(function(password){
    //storing user given pw into a private variable
    this._password = password;
    //populating the salt here
    this.salt = uuidv1();
    //encrypting pw and storing in 'enc_password'
    this.enc_password = this.encryptPassword(password);
})
.get(function(password){
    return this._password;
});


userSchema.methods = {
    authenticate: function(plainPassword){
        return this.encryptPassword(plainPassword) === this.enc_password;
    },
    encryptPassword: function(plainPassword){
        if(!plainPassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            //the 'this' keyword will refer to userSchema as we are 
            //defining a userSchema method.
            .update(plainPassword)
            .digest('hex');
        } catch (err) {
            console.log("error occured in encrypting password");
            return "";
        }
    }
}

module.exports = mongoose.model( "User", userSchema );