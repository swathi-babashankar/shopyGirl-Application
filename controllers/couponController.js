import Coupon from "../model/couponSchema"


exports.createCoupon = async (req, res) => {

    try{

        const {couponCode, discount} = req.body;
        // const {couponId} = req.params;
        if(!couponCode.match(/\d [A-Z] [a-z]+/g)){

            throw new Error("Please create a coupon code atleast with a digit and an uppercase letter")

        }

        if(!discount){
            throw new Error("Please specify discount percentage")
            // convert the percent to amount in ordercontroller 
        }

        const couponExist = await Coupon.findOne({couponCode});
        if(couponExist){
            throw new Error("Coupon code already exist. Please change the code")
        }

        const couponCreated = await Coupon.create({couponCode, discount});

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