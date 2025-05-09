
const { ObjectId } = require("mongodb");
const Coupon = require("../model/couponSchema");


exports.createCoupon = async (req, res) => {

    try{

        const {couponCode, discount, validTill} = req.body;

        if(!couponCode.match(/[\w\d]+/)){

            throw new Error("Please create a coupon code atleast with a digit and an uppercase letter")

        }

        if(!discount){
            throw new Error("Please specify discount percentage")
            // convert the percent to amount in ordercontroller - done
        }

        if(!couponCode || !validTill){
            throw new Error("Enter coupon code and Expiry date to create a coupon")
        }

        const couponExist = await Coupon.findOne({couponCode});
        if(couponExist){
            throw new Error("Coupon code already exist. Please change the code")
        }

        const couponCreated = await Coupon.create({couponCode, discount, validTill});

        res.status(202).json({
            success: true,
            message: "Coupon created successfully",
            couponCreated
        })
    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
        })

    }

}

exports.getCoupons = async(req, res) => {

    try{

        const coupons = await Coupon.find({});
        console.log(coupons);

        res.status(202).json({
            success: true,
            message: "Here are all available coupons",
            coupons
        })

    }

    catch(err){

        res.status(202).json({
            success: true,
            message: err.message
        })

    }
}

exports.editCoupon = async(req, res) => {

    try{

        const {couponId} = req.query;
        const {couponCode, discount, validTill} = req.body;

        const newId = ObjectId.createFromHexString(couponId)

        if(!couponId){
            throw new Error("Please pass the coupon ID")
        }

        if(!couponCode || !discount || !validTill){
            throw new Error("Please fill all the necessary fields")
        }

        const updateCoupon = await Coupon.findByIdAndUpdate(newId, {couponCode, discount, validTill});

        if(!updateCoupon){
            throw new Error("Sorry could not update the coupon")
        }

        res.status(202).json({
            success: true,
            message: "Coupon updated successfully",
            updateCoupon
        })

    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
        })

    }
}

exports.deleteCoupon = async (req, res) => {

    try{

        const {couponId} = req.query;

        const newId = ObjectId.createFromHexString(couponId)

        if(!couponId){
            throw new Error("Please pass the coupon ID")
        }

        const couponDeleted = await Coupon.findByIdAndDelete(newId);

        res.status(202).json({
            success: true,
            message: "Coupon deleted successfully",
            couponDeleted
        })
    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
        })

    }
}

exports.deleteExpiredCoupon = async (req, res) => {

    try{

        const {adminId} = req.query;
        // const {validTill} = req.body;

        // const today = Date()
        let date = new Date()

        // let dateAndTime = date.getFullYear();
        console.log(date);
        // date.

        // const newId =  ObjectId.createFromHexString(couponId)
        
        // const {couponValid} = Coupon
        // get all the coupons 
        // find the expiry date
        // compare whether the expiry date is less than current date
        // delete the coupon if condition is true

        const deleteExpCoupon = await Coupon.deleteMany({validTill: {$lt: date}})

        console.log("expired couponsss",deleteExpCoupon);
        
        // if(!couponId){
        //     throw new Error("Please pass your coupon ID")
        // }

        // if(!validTill){
        //     throw new Error("Please enter the date coupon expires")
        // }

        // if(validTill >= today){
        //     const deleteExpCoupon = await Coupon.findByIdAndDelete(newId);

            res.status(202).json({
                success: true,
                message: "Expired coupon deleted successfully",
                deleteExpCoupon
            })

        
    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
        })

    }
}