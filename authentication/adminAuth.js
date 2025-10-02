const jwt = require("jsonwebtoken");
const admin = require("../model/adminSchema");
const config = require("../config/index");

exports.adminAuth = async(req, res) => {

    let adminToken;

    // if(!req.cookies.adminToken || (!req.headers.authorization && req.headers.authorization.startsWith("Bearer")) ){

    //     adminToken = req.cookies.adminToken || req.headers.authorization.split(" ")[1]

    // }
    if (req.cookies && req.cookies.adminToken) {
        adminToken = req.cookies.adminToken;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        adminToken = req.headers.authorization.split(" ")[1];
    }

    if(!adminToken){
        throw new Error("You are not authorized to access this route")
    }

    try{

        const decodeJwt = jwt.verify(adminToken, config.ADMIN_JWT_SECRET);

        req.admin = await admin.findById(decodeJwt._id);
        next();

    }

    catch(err){

        res.status(404).send(err.message);

    }

}
