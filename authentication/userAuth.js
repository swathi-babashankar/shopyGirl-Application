const jwt = require("jsonwebtoken");
const User = require ("../model/userSchema");
const {config} = require("../config/index");

exports.loginAuth = async (req, res, next) => {

    let token;

    // if(!req.cookies.token || (!req.headers.authorization && req.headers.authorization.startsWith("Bearer")) ){
    //     console.log(req.headers.authorization);

    //     token = req.cookies.token || req.headers.authorization.split(" ")[1]
        
    // }
     if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        throw new Error("Not authorised to access this route", 401)
    }

    try{

        console.log("control is in try ");

        const decodedjwt = jwt.verify(token, config.JWT_SECRET);

        if(!decodedjwt){
            throw new Error("Could not verify token")
        }

        req.user = await User.findById(decodedjwt._id);
        next()

    }

    catch(err){

        res.status(404).send("Invalid token")

    }
}
// completed


