const mongoose=require('mongoose')
const Schema=mongoose.Schema
const jwt = require('jsonwebtoken');
const userSchema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken: {
        type: String
    }
})


userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            userId: this._id
        },
        process.env.REFRESH_TOKEN_KEY
        ,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        });
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            userId: this._id,
            username: this.username
        },
        process.env.ACCESS_TOKEN_KEY
        ,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        });
}

module.exports= mongoose.model("users",userSchema)