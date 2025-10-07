const jwt = require("jsonwebtoken");
const Admin = require("../model/adminSchema");
const { config } = require("../config/index");

exports.adminAuth = async(req, res, next) => {

    let adminToken;

    // if(!req.cookies.adminToken || (!req.headers.authorization && req.headers.authorization.startsWith("Bearer")) ){

    //     adminToken = req.cookies.adminToken || req.headers.authorization.split(" ")[1]

    // }
    if (req.cookies && req.cookies.adminToken) {
        adminToken = req.cookies.adminToken;
        console.log(adminToken)
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        adminToken = req.headers.authorization.split(" ")[1];
    }

    if(!adminToken){
        throw new Error("You are not authorized to access this route")
    }

    try{
console.log("SECRET", config.ADMIN_JWT_SECRET, config.ADMIN_JWT_EXPIRY);
        const decodeJwt = await jwt.verify(adminToken, config.ADMIN_JWT_SECRET);
        console.log(decodeJwt);

        req.admin = await Admin.findById(decodeJwt.id);
        console.log("req.admin", req.admin);
        next();

    }

    catch(err){

        res.status(404).send("Invalid token");

    }

}














