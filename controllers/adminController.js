
const { ObjectId } = require("mongodb");
const { config } = require("../config/index");
const Admin = require("../model/adminSchema");
const bcrypt = require("bcrypt");
const  jwt = require("jsonwebtoken");


 const setCookieOption = {
    expires: new Date(Date.now(2*24*60*60*1000)),
    // httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
    
};

function generateNewToken(admin){
    return jwt.sign({
        id: admin._id
    },
        config.ADMIN_JWT_SECRET,
        {
            expiresIn: config.ADMIN_JWT_EXPIRY
        }
    )
};

exports.createAdmin = async (req, res) =>{

    try{

        const {name, phoneNo, email, secret} = req.body;
        
        let {password} = req.body

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

        res.cookie("adminToken", adminToken, {... setCookieOption})
        res.setHeader("authorization", adminToken)

        res.status(202).json({
            success: true,
            message: "Admin profile created successfully",
            createAdmin
        })
        
    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
            
        })
    }
}

exports.getAdminAccount = async (req, res) => {

    try {

        const { adminId } = req.query;

        const adminAccount = await Admin.findById(adminId);

        res.status(202).json({
            success: true,
            message: "Here is your Account Information",
            adminAccount
        })
    }

    catch(e) {

        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

exports.editAdmin = async (req, res) => {

    try{

        const {id} = req.query;
        let {email, password, newPswd, confirmPaswd, phoneNo} = req.body;
        // const {adminToken} = req.cookies;

      const newId =  ObjectId.createFromHexString(id)
        const existingAcc = await Admin.findOne({email});

        if(!id){
            throw new Error("Sorry we could not grab your ID")
        }

        // if(!adminToken){
        //     throw new Error("Sorry you are not authorized to access this page ")
        // }

        if(!email || !password){
            throw new Error("Please fill all the fields")
        }

        // Comparing entered password with existing admin password

        const comparePswd = await bcrypt.compare(password, existingAcc.password);
        if(comparePswd === false){
            throw new Error("Sorry your passwords does not match");
        }

        // Replacing the password field with new password if the new password and confirmation password are same

        if(newPswd === confirmPaswd){
            password = newPswd;
        }

        else{
            throw new Error("Value of password and confirm password field should be same")
        }
        // console.log(password);

        const encryPswd = (await bcrypt.hash(password, 15)).toString()

        const updatedDetails = await Admin.findByIdAndUpdate(newId, {email, password: encryPswd, phoneNo});

        // Regenerating the token

        let adminToken;
    //    const regenratedToken = updatedDetails.tokenGenerate();

       updatedDetails.adminToken = generateNewToken(updatedDetails);
       adminToken = updatedDetails.adminToken;
       updatedDetails.password = undefined;

       res.cookie("adminToken", adminToken, this.setCookieOption)
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
        const existingAcc = await Admin.findOne({email});

        if(!email || !password || !secret){
            throw new Error("Enter your EMAIL, PASSWORD and SECRET");
        }

        const comparePswd = await bcrypt.compare(password, existingAcc.password);

        if(comparePswd === false){
            throw new Error("Invalid Email or Password")
        }

        const adminLoggedIn = await Admin.findOne({email}).select("+password");
        
        if(!adminLoggedIn){
            throw new Error("Invalid login creadentials")
        }

        ;
        // console.log(existingAcc.password);

        if(comparePswd){

            let adminToken;
            // const adminToken = adminLoggedIn.tokenGenerate();
            adminLoggedIn.adminToken = generateNewToken(adminLoggedIn);
            adminToken = adminLoggedIn.adminToken;
            adminLoggedIn.password = undefined;

            res.cookie("adminToken", adminToken,  {... setCookieOption});
            // res.setHeader("authorization", adminToken)

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
        const existingAcc =  await Admin.findOne({email});

        if(!email || !password){
            throw new Error("Please enter your Email and Password to delete account")
        }

        const comparePswd = bcrypt.compare(password, existingAcc.password);

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










