import Cart from "../model/cartSchema";
import User from "../model/userSchema";
import Product from "../model/tshirtSchema";
import Coupon from "../model/couponSchema";
import Order from "../model/orderSchema";

/* Create order 
- ProdId, Address, Payment options*/

exports.placeOrder = async(req, res) => {

    try{

        const {address, couponCode} = req.body;
        const {prodId, userId} = req.params;

        if(!address || !couponCode){
            throw new Error("Please fill up all the necessary fields")
        }

        // Find user Exist

        const userExist = await User.findById(userId);
        if(!userExist){
            throw new Error("User does not exist")
        }

        // Find product exist

        const productExist = await Product.findById(prodId)
        if(!productExist){
            throw new Error("Product does not exist")
        }

        // find coupon exist

        const couponExist = await Coupon.find({couponCode})
        if(!couponExist){
            throw new Error("Coupon code is invalid")
        }

        // calulate net amount
        let prodPrice = Product.price;
        console.log(prodPrice);

        let couponDisc = Coupon.discount;
        console.log(couponDisc);

        let netAmt = prodPrice - couponDisc;
        console.log(netAmt);



        // create an order it needs razorpay account and details

    }

    catch(err){
        res.status(404).json({
            success: false,
            message: err.message
        })

    }
}

// Edit address or contact 

exports.editOrderDetails = async (req, res) => {

    try{

        const {address, phoneNo} = req.body;
        const {userId, orderId} = req.params;

        if(!address || !phoneNo){
            throw new Error("Please fill the field you want to update")
        }

        const userExist = await User.findById(userId);
        if(!userExist){
            throw new Error("User does not exist")
        }

        const orderExist = await Order.findById(orderId);
        if(!orderExist){
            throw new Error("This order does not exist")
        }

        // Updating the order details

        const updatedDetails = await Order.findByIdAndUpdate(userId, {address, phoneNo});
        console.log(updatedDetails);

        res.status(202).json({
            success: true,
            message: "Order details updated successfully",
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
// Cancel order

exports.cancelOrder = async (req, res) => {

    try{

        const {orderId} = req.params;
        if(!orderId){
            throw new Error("Please pass the orderID")
        }

        const orderCancel = await Order.findByIdAndDelete({orderId});

        res.status(202).json({
            success: true,
            message: "Order cancelled successfully",
            orderCancel
        })

    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
        })

    }
}
