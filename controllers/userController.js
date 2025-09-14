const user = require("../model/userSchema");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")
const {config} = require("../config/index");
const { ObjectId } = require("mongodb");


const cookieProp = {
    expires: new Date(Date.now() + 10800000),
    // 180,000expires: (60*60),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
}


function newToken(user){
    return JWT.sign({
                id: user._id,
                },
                 config.JWT_SECRET,
                 {expiresIn: config.JWT_EXPIRY},
                 )
}

exports.createUser = async(req, res) => {

    try{
        const {name, email, phoneNo} = req.body;
        let {password} = req.body;

        if(!name || !email || !password || !phoneNo){
            throw new Error("Please enter your Name, Email, Password, PhoneNo")

        }

        // To check if user/email already exist

        const existedUser = await user.findOne({email})
        if(existedUser){
            throw new Error("User with entered Email already exist")
        }

        const saltround = 13
        // point toString()`
        const encryptedpswd = (await bcrypt.hash(password, saltround)).toString();

        const userCreated = await user.create({
            name,
            email,
            password: encryptedpswd,
            phoneNo
        })
        
        console.log(userCreated);

        // Creating token for every new user/D
       
        let token
       userCreated.token = newToken(userCreated)
       token = userCreated.token
        
        console.log("token is", userCreated.token);
        userCreated.password = undefined;

        // setting up the token to cookies

        res.cookie("token", token, {...cookieProp})

        res.status(200).json({
            success: true,
            message: "User created successfully",
            userCreated

        })
    }

    catch(err) {

        console.log(err);
        res.status(400).json({
            success: false,
            message: err.message
        })

    }
}
// This should be a restricted route?
exports.getUser = async(req, res) => {

    try{

    const userFetched = await user.find({});

    const {email} = req.body;
    if(email){
        const requestedUser = await user.find({email});
        console.log(requestedUser);

        res.status(202).json({
            success: true,
            message: "Requsted user fetched successfully",
            requestedUser
        })
    }
    
    console.log(userFetched);
    

    res.status(202).json({
        success: true,
        message: "Here are list of users",
        userFetched
    })

    }

    catch(err){

        console.log(err);
        res.status(402).json({
            success: false,
            message: err.message
        })

    }

};

exports.getUserAccount = async (req, res) => {

    try {

        const { userId } = req.query;

        if(!userId) {
            throw new Error("Sorry we could not get your ID")
        }

        const userAccount = await user.findById(userId);

        res.status(202).json({
            success: true,
            message: "Here is your Account Information",
            userAccount
        })
    }

    catch(e) {

        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

exports.userLogin = async(req, res) => {

    try{

        const {email, password} = req.body;
        // const password = user.password

        if(!email || !password){
            throw new Error("Please enter your Email and password")
        }

        const userLoggedin = await user.findOne({email}).select("+password");
        const pswdValidated = await bcrypt.compare(password, userLoggedin.password);

        if(pswdValidated === false){
            throw new Error("Invalid EMAIL or PASSWORD. Please try again")
        }

        

        if(!userLoggedin){
            throw new Error("Your credentials are invalid... Please try again")
        }
        
        console.log(userLoggedin.password, password);

        if(pswdValidated === true){

            let token;
            userLoggedin.token = newToken(userLoggedin);
            token = userLoggedin.token;

            userLoggedin.password = undefined;
            res.cookie("token", token, {...cookieProp })

            res.status(202).json({
                success: true,
                message: "You logged in successfully, Have a good day :)",
                userLoggedin,
                token
            })
        }

    }

    catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

// If user wants to change his credentials
exports.updateUser = async(req, res) => {

    try{

    const {name, email, newPswd, confirmPswd, phoneNo} = req.body;
    let {password} = req.body
    
    const existinguser = await user.findOne({email})
    const {id} = req.query;
    console.log("id is",id);
    const newId = ObjectId.createFromHexString(id)
    console.log(newId);

    if(!id){
        throw new Error("Sorry we could not fetch your ID")
    }

    if(!email || !name || !password || !phoneNo){
        throw new Error("Please Enter your Name, Email, Password and PhoneNo");
    }

    
    const pswdCompared = await bcrypt.compare(password, existinguser.password );

    if(!pswdCompared){

        throw new Error("Sorry your password do not match");
        
    }
    // generate new token
    // If user wants to change the password
    if(newPswd && confirmPswd){

    if(newPswd === confirmPswd){
        password = newPswd;
    }

    else{
        throw new Error("Value of password and confirm password field should be same")
    }
}

const encryPswd = (await bcrypt.hash(password, 13)).toString()
    
    const userUpdated = await user.findByIdAndUpdate(newId, {name, email, password: encryPswd, phoneNo});
    

    
    console.log(userUpdated);
    let token
    userUpdated.token = newToken(userUpdated);

    token = userUpdated.token;
    userUpdated.password = undefined;

    res.cookie("token", token, {...cookieProp})
    res.status(202).json({
        success: true,
        message: "User credentials updated successfully",
        userUpdated
    })

    }

    catch(err){

        res.status(401).json({
            success: false,
            message: err.message,
        })

    }

}

exports.userLogout = async(req, res) => {

try {

    const { userId } = req.query;

    const userLoggedout =  await user.findByIdAndUpdate(userId, {
        $unset: {
            token: 1
        },
    },
    {
        new: true
    })
    
    res.clearCookie("token", {httpOnly: true, secure: true, sameSite:'none'});

    res.status(202).json({
        success: true,
        message: "User Logged Out Successfully :("

    })
}

catch(err){
    
    res.status(402).json({
        success: false,
        message: err.message
    })
}

}

exports.deleteUser = async (req, res) => {

    try{

        const {email, password} = req.body;
        const {id} = req.query
        const existingUser = await user.findOne({email})

        if(!email || !password){
            throw new Error("Please enter your Email and password")
        }

        const pswdCompared = bcrypt.compare(password, existingUser.password);

        const objectId = ObjectId.createFromHexString(id)

        if(pswdCompared){
            const userDeleted = await user.findByIdAndDelete(objectId, {email})
            console.log(userDeleted);
            
            res.status(201).json({
                success: true,
                message: "User deleted successfully",
                userDeleted
            })

        }
    }

    catch(err){

        res.status(402).json({
            success: false,
            message: err.message,
        })

    }

}

// To make routes protected








