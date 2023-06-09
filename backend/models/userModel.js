const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed more than 30 characters"],
        minLength:[3,"Name should have at least 3 characters"]

    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Email"],
        minLength:[8,"Password should have at least 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
    type :Date,
    default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
    
});
// Hashing
UserSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10) 
})
//JWT Token
UserSchema.methods.getJWTToken = function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Compare Password
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}


// Genarating reset password token
UserSchema.methods.getResetPassTok = function () {
    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex")

    // Hashing and Adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
    return resetToken
}
module.exports = mongoose.model("User",UserSchema);