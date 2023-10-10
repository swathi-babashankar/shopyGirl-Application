
const { config } = require("../config/index");
const Admin = require("../model/adminSchema");
const bcrypt = require("bcrypt");
const  jwt = require("jsonwebtoken");


exports.setCookieOption = {
    expires: new Date(Date.now(2*24*60*60*1000)),
    httpOnly: true
}

function generateNewToken(admin){
    return jwt.sign({
        id: admin._id
    },
        config.ADMIN_JWT_SECRET,
        {
            expiresIn: config.ADMIN_JWT_EXPIRY
        }
    )
}

exports.createAdmin = async (req, res) =>{

    try{

        const {name, phoneNo, email, password, secret} = req.body;

        // send OTP to provided phoneNumber with twilio and send mail with SMTP

        if(!name|| !phoneNo || !email || !password || !secret){
            throw new Error("These are necessary fields. Please fill it");
        }

        const adminExist = await Admin.findOne({email});

        if(adminExist){
            throw new Error("This email already exist")
        }

        const encryptpswd = (await bcrypt.hash(password, 15)).toString();

        // To retrieve the no.of docs in the Admin collection
       const docs = await Admin.countDocuments()
        console.log("no of docs iss",docs);


         // Check if admin accounts are greater than one and if its true throw an error that admin exist 
        if(docs>0){
            throw new Error("Request DENIED")

        }

        const createAdmin = await Admin.create({
            name,
            phoneNo,
            email,
            password: encryptpswd,
            secret
        })

        let adminToken;
        createAdmin.adminToken = generateNewToken(createAdmin);
        adminToken = createAdmin.adminToken;
        createAdmin.password = undefined;

        res.cookie("adminToken", adminToken, this.setCookieOption)

        res.status(202).json({
            success: true,
            message: "Admin profile created successfully",
            createAdmin
        })
        
    }

    catch(err){

        console.log("catch block");
        res.status(404).json({
            success: false,
            message: err.message
            
        })
    }
}

exports.editAdmin = async (req, res) => {

    try{

        const {adminId} = req.params;
        const {email, password, newPswd, confirmPaswd} = req.body;
        const {adminToken} = req.cookies;
        const {oldPaswd} = Admin.password;

        if(!adminId){
            throw new Error("Sorry we could not grab your ID")
        }

        if(!adminToken){
            throw new Error("Sorry you are not authorized to access this page ")
        }

        if(!email || !password){
            throw new Error("Please fill all the fields")
        }

        // Comparing entered password with existing admin password

        const comparePswd = bcrypt.compare(oldPaswd, password);
        if(comparePswd === false){
            throw new Error("Sorry your passwords does nit match");
        }

        // Replacing the password field with new password if the new password and confirmation password are same

        if(newPswd === confirmPaswd){
            password = newPswd;
        }

        console.log(password);

        const updatedDetails = await Admin.findByIdAndUpdate(adminId, {email, password});

        // Regenerating the token

       const regenratedToken = updatedDetails.tokenGenerate();

       updatedDetails.adminToken = regenratedToken;
       updatedDetails.password = undefined;

       res.status(202).json({
        success: true,
        message: "Admin credentials updated successfully",
        updatedDetails
       })
    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
        })

    }
}

exports.adminLogin = async (req, res) => {

    try{

        const {email, password, secret} = req.body;
        const {existingPswd} = Admin.password;

        if(!email || !password || !secret){
            throw new Error("Enter your EMAIL, PASSWORD and SECRET");
        }

        const adminLoggedIn = await Admin.findOne({email}).select("+password", "+secret");

        if(!adminLoggedIn){
            throw new Error("Invalid login creadentials")
        }

        const comparePswd = bcrypt.compare(password, existingPswd);

        if(comparePswd === true){

            const adminToken = adminLoggedIn.tokenGenerate();
            adminLoggedIn.adminToken = adminToken;
            adminLoggedIn.password = undefined;

            res.cookie("adminToken", adminToken, this.setCookieOption);

            res.status(202).json({
                success: true,
                message: "You LOGGED IN successfully",
                adminLoggedIn,
                adminToken
            })
        }
    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
        })
    }

}

exports.adminLogout = async (req, res) => {

    try{

        res.clearCookie("adminToken", {httpOnly: true});
        res.status(202).json({
            success: true,
            message: "LOGGED OUT successfully"
        })

    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

exports.deleteAccount = async (req, res) => {

    try{

        const {email, password} = req.body;
        const {existingPswd} = Admin.password;

        if(!email || !password){
            throw new Error("Please enter your Email and Password to delete account")
        }

        const comparePswd = bcrypt.compare(password, existingPswd);

        if(comparePswd === false){
            throw new Error("Invalid credentials. Please enter valid Email and Password")
        }

        const deleteAccount = await Admin.findOneAndDelete({email});

        res.status(202).json({
            success: true,
            message: "Account DELETED successfully",
            deleteAccount
        })
    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
        })

    }

}
