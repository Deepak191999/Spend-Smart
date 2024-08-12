const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/ErrorHandler');
const User=require('../models/users');

module.exports =  (async(req, res, next) => {
    const incomingAccessToken = req.cookies.accessToken;
    const incomingRefreshToken = req.cookies.refreshToken;

    console.log("incomingAccessToken", incomingAccessToken);
    console.log("incomingRefreshToken", incomingRefreshToken);
    if (!incomingAccessToken || !incomingRefreshToken) {
       return false;
    }
    
    try {
        const decoded = jwt.verify(incomingAccessToken, process.env.ACCESS_TOKEN_KEY);
        
        let user = await User.findOne({
            _id: decoded.userId,
        });
        if (!user || incomingRefreshToken !== user.refreshToken) {
            console.log("User not found", user);
            return false;
        }
        req.user=user;
        return true;
        
    } catch (error) {
        return false;
    }
})