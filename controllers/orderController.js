const Cart = require("../model/cartSchema");
const User = require("../model/userSchema");
const Product = require("../model/tshirtSchema");
const Coupon = require("../model/couponSchema");
const Order = require("../model/orderSchema");
const {razorpay} = require("../config/razorpay");
const { ObjectId } = require("mongodb");

/* Create order 
- ProdId, Address, Payment options*/

exports.placeOrder = async (req, res) => {

    try {

        const {address, couponCode, quantity, phoneNo} = req.body;
        const {prodId, userId} = req.query;
        // const {productId} = req.params

        console.log(prodId, userId);

        // But what if there is multiple items for order 
        // 1. May be get all the products in cart using productsInCart = cart.find({})
        // 2. const productIds =  [productsInCart.id]


        if(!address || !phoneNo){
            throw new Error("Please fill up all the necessary fields")
        }

        // Find user Exist

    //  const userID = ObjectId.createFromHexString(userId)

        // userId = new ObjectId(userId)
        
        const userExist = await User.findById(userId);
        if(!userExist){
            throw new Error("User does not exist")
        }

        // Find product exist
        // Find whether this product present in cart doubt-$in if not add this to cart
        // After placing the order remove those items from cart 

        const productExist = await Product.findById(prodId)
        console.log(productExist);
        if(!productExist){
            throw new Error("Product does not exist")
        }

        // Searching for nested product id 
        const productExistInCart = await Cart.findOne({
            'product._id': prodId
            
        })

        // Extracting the product's cartID to pass to the order document

        let cartId = productExistInCart.id
        console.log("line 58");
        console.log("Whether the ordering product exist in cart", productExistInCart, cartId);

        if(!cartId){

            const addProductToCart = await Cart.create({product: productExist, quantity, userId})
            cartId = addProductToCart._id

            // Adding reference cartId to user 

            if(!userExist.productId){
                userExist.productId = cartId
                
            }
                /* if there is ProductId the push the new product ids to the document otherwise the older 
                ids will be replaced with new id */
    
            else {
                userExist.productId.push(cartId)
            }

            console.log("Missing product added to cart", addProductToCart);
        }

        console.log(cartId);

        // find coupon exist

        const couponExist = await Coupon.find({couponCode})
        console.log("coupon exist",couponExist[0].discount);
        if(!couponExist){
            throw new Error("Coupon code is invalid")
        }

        // calulate net amount
        let prodPrice = productExist.price;
        console.log(prodPrice);

        let couponDisc = couponExist[0].discount;
        console.log(couponDisc);

        // This code executes only if there is a active coupon discount

        if(couponDisc)
        {

            let discountAmt = (couponDisc/100) * prodPrice;
            console.log(discountAmt);

            let netAmt = prodPrice - discountAmt;
            console.log(netAmt);

        // create an order it needs razorpay account and details

            const options = {
                amount: netAmt,
                currency: "INR",
                receipt: `reciept_${new Date().getTime()}`
            }

            const razorpayResponse = await razorpay.orders.create(options);

            console.log("Response from razorpay", razorpayResponse, razorpayResponse.id);

            const razorpayId = razorpayResponse.id;

            const orderPlaced = await Order.create({userId, productId: cartId, address, razorpayId, netPrice: netAmt, couponCode, quantity, phoneNo})
            console.log(orderPlaced);

            res.status(200).json({
                success: true,
                message: "Your order placed successfully",
                orderPlaced

            })  
        }

        // create an order it needs razorpay account and details without coupon
        else
        {

        const options = {
            amount: prodPrice,
            currency: "INR",
            receipt: `reciept_${new Date().getTime()}`
        }

        const razorpayResponse = await razorpay.orders.create(options);
        console.log(options);

        console.log("Response from razorpay", razorpayResponse, razorpayResponse.id);

        const razorpayId = razorpayResponse.id;

        const orderPlaced = await Order.create({userId, productId: cartId, address, razorpayId, netPrice: prodPrice, couponCode, quantity, phoneNo})
        console.log(orderPlaced);

        res.status(200).json({
            success: true,
            message: "Your Order Placed SUCCESSFULLY.. HAPPY SHOPPING :)",
            orderPlaced
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

// Get all orders

exports.getAllOrders = async (req, res) => {

    try{

        // Not sure how it works 
        let {userId} = req.params;

        console.log(userId);

        // userId = ObjectId.createFromHexString(userId) 

        const allOrders = await Order.find({
            'userId': {$in: userId} 
        });

        console.log(allOrders);

        res.status(202).json({
            success: true,
            message: "Here are your orders",
            allOrders
        })
    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
        })

    }
}

exports.admingetAllOrders = async (req, res) => {

    try
    {

        const allOrders = await Order.find({})

        res.status(200).json({
            success: true,
            message: "Here are all orders of all the customers",
            allOrders
        })
    }

    catch{

        res.status(404).json({
            success: false,
            message: err.message
        })

    }
}

// Edit address or contact 

exports.editOrderDetails = async (req, res) => {

    try{

        const {address, phoneNo, quantity} = req.body;
        const {userId, orderId} = req.query;

        const userExist = await User.findById(userId);
        if(!userExist){
            throw new Error("User does not exist")
        }

        const orderExist = await Order.findById(orderId);
        if(!orderExist){
            throw new Error("This order does not exist")
        }

        // Updating the order details

        if(orderExist.userId == userId) {

        const updatedDetails = await Order.findByIdAndUpdate(orderId, {address, phoneNo, quantity});
        console.log(updatedDetails)
    
        res.status(202).json({
            success: true,
            message: "Order details updated successfully",
            updatedDetails
        })
    }

    else{
        throw new Error("Sorry you are NOT authorized to update the order details")
    }

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

        const {orderId, userId} = req.query;
        if(!orderId){
            throw new Error("Please pass the orderID")
        }

        const orderExist = await Order.findById(orderId);
        if(!orderExist){
            throw new Error("This order does not exist")
        }

        if(orderExist.userId == userId){

           const orderCancel = await Order.findByIdAndDelete(orderId);

           res.status(202).json({
               success: true,
               message: "Order cancelled successfully",
               orderCancel
           })
        }

        else{
            throw new Error("You are NOT authorized to delete this order")
        }
    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
        })

    }
}
