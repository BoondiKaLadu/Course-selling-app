//ALWAYS AVOID THE CIRCULAR DEPENDENCY



// since we are doing a JWT based auth


const jwt = require('jsonwebtoken');
// we will take the same password we took for user.js in routes
const {JWT_SECRET_User} = require("../config");

// we will take token from headers (client) and then verify it
function  userMiddleware (req,res,next) {

    // we take the token from the user
 const token = req.headers.token
 const decoded = jwt.verify(token, JWT_SECRET_User);
 
 if (decoded) {
    req.userID = decoded.id;
    next()
 }else {
    res.status(403).json ({
        message : "user not signed in"
    })
 }
    
 }
 module.exports = {
    userMiddleware : userMiddleware
 }

