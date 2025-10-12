const Cart = require("../model/cartSchema");
const User = require("../model/userSchema");
const Product = require("../model/tshirtSchema");
const Coupon = require("../model/couponSchema");
const Order = require("../model/orderSchema");
const {razorpay} = require("../config/razorpay");

/* Create order 
- ProdId, Address, Payment options*/

exports.placeOrder = async (req, res) => {

    try {

        let {address,name , phoneNo, couponCode, quantity  } = req.body;
        
        const { userId } = req.query;
        // const {productId} = req.param;

        console.log( userId);

        const allOrders = await Order.find({
            'userId': {$in: userId} 
        });

        if(allOrders.length !== 0) {
            address = allOrders[0].address;
            name = allOrders[0].name;
            phoneNo = allOrders[0].phoneNo;
            
        }

        

        // But what if there is multiple items for order 
        // 1. May be get all the products in cart using productsInCart = cart.find({})
        // 2. const productIds =  [productsInCart.id]

        // check if there is prodId if extist create order for only that particular prod after order successfull delete the prodId from cart

        if(!address || !phoneNo || !name){
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
    //    Let this be there
        

        

        // Wrap this orderCreate with for loop becoz there might be a chance of having multiple product to order
        // May be now find all the products from cart here => cart.find({}) => this will return [array]
        // => loop through and extract Id, quantity and price
        // => wrap razorpay order and create database order inside same loop so that order will be created together for single products
        // => And will stop when the cart products finish

        const allCartItems = await Cart.find({});

        for(let i = 0; i<=allCartItems.length-1; i++){

        console.log("Zeroth item's price iss", allCartItems[i]?.product[0].price);

        
        console.log("Zeroth item's Id iss", allCartItems[i]?.id);
        console.log("Zeroth item's qty iss", allCartItems[i]?.quantity);

        const prodCartId = allCartItems[i]?.id
        // find coupon exist
        // calulate net amount
        let prodPrice = allCartItems[i]?.product[0].price;
        let realId = allCartItems[i]?.product[0]._id

        // console.log(prodPrice*qty);

        let qty = allCartItems[i]?.quantity
        let grossAmt = prodPrice * qty;
        
        if(couponCode){

        const couponExist = await Coupon.find({couponCode})
        // console.log("coupon exist",couponExist[0].discount);
        if(!couponExist){
            throw new Error("Coupon code is invalid")
        }
            
        let couponDisc = couponExist[0].discount;
        console.log("line 111");

        console.log(couponDisc);

        // This code executes only if there is a active coupon discount

        if(couponDisc)
        {

            let discountAmt = (couponDisc/100) * grossAmt;
            console.log(discountAmt);

            let netAmt = grossAmt - discountAmt;
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

            const orderPlaced = await Order.create({userId, productId: prodCartId, realProductId: realId, name, address, razorpayId, netPrice: netAmt, couponCode, quantity, phoneNo})
            console.log(orderPlaced);

            // If the order is successfull delete the items from the cart
            

            // Decrease the stock of that particular product maybe using aggregation pipeline

            let prodId = allCartItems[i].product[0]._id;
            let size = allCartItems[i].size;
            console.log(size);
            const prodFind = await Product.findById(prodId);
            let sizeandstock = prodFind.sizeAndStock; 
            console.log("size  and stock",sizeandstock);
            // compare the size with sizeAndStock and find the number of stock
            // 
            // -grab the size of the product and find the stock of that particular size  from product schema
            // -Deduct the no.of quantity ordered from the stock

            res.status(200).json({
                success: true,
                message: "Your order placed successfully",
                orderPlaced,
                
    
            })  
        }
        }

        // create an order it needs razorpay account and details without coupon
        else
        {

        const options = {
            amount: prodPrice,
            currency: "INR",
            receipt: `reciept_${new Date().getTime()}`
        }

            console.log(options);
        const razorpayResponse = await razorpay.orders.create({...options});

        console.log("Response from razorpay", razorpayResponse, razorpayResponse.id);

        const razorpayId = razorpayResponse.id;

        var orderPlaced = await Order.create({userId, productId: prodCartId, realProductId: realId, name, address, razorpayId, netPrice: grossAmt, quantity: qty, phoneNo})
        console.log("Order placed",orderPlaced);

        let findingProduct;

            if(orderPlaced.productId){

            findingProduct = await Cart.findById(orderPlaced.productId)
            findingProduct = findingProduct.product[0];
             
            // localStorage.setItem("orderedProduct", findingProduct);

            const deleteFromCart = await Cart.findByIdAndDelete(orderPlaced.productId);
            // res.status(200).json({
            //     message: "here are the product ordered",
            //     findingProduct
            // })
            // res.write(`Ordered items deleted from cart successfully ${deleteFromCart, JSON.stringify(prodOrdered)}`  );
        }

        

        let prodId = allCartItems[i].product[0]._id;
        let size = allCartItems[i].size;
        console.log("size and id",size, prodId);
        console.log("working line 176");

        // const prodFind = await Product.updateOne({prodId}, 'sizeAndStock'.size - qty )

        

            //  $subtract: [{sizeAndStock: {$in: [Object.values(size)]}}, qty ]} );
    //    updateOne({
        // $subtract: [{$getField: {sizeAndStock:{$match: [size]}}, qty }] })
         
        // let sizeandstock = prodFind.sizeAndStock; 
        // sizeandstock.map((sandS) =>{
        //     console.log("sandS", Object.keys(sandS));
        //     if(Object.keys(sandS) == size){
        //         stock = Object.values(sandS) - qty;
                
        //         console.log(stock)
        //     }
        // })

        // console.log("size  and stock",prodFind);
        // return orderPlaced
        res.write(`Your order placed  SUCCESSFULLY ${orderPlaced}`)

        // 
    }     
    }
    res.end()
    }

    catch(err){
        res.status(400).json({
            success: false,
            message: err
        })

    }
}

exports.orderSingleProduct = async (req, res) => {

    try {

        const { prodId, userId } = req.query;
        const { name, address, couponCode, quantity, phoneNo } = req.body;

        const productExist = await Product.findById(prodId)
        console.log(productExist);
        if(!productExist){
            throw new Error("Product does not exist")
        }

        const userExist = await User.findById(userId);

        if(!userExist){
            throw new Error("User does not exist")
        }

        // Searching for nested product id , need this to find whwther the selected single prod exist in cart or not
        const productExistInCart = await Cart.findOne({
            'product._id': prodId
            
        })

        // Extracting the product's cartID to pass to the order document

        let cartId = productExistInCart.id;
        console.log("line 58");
        console.log("Whether the ordering product exist in cart", productExistInCart, cartId);

        if(!cartId) {

            const addProductToCart = await Cart.create({product: productExist, quantity, userId})
            cartId = addProductToCart._id

            // Adding reference cartId to user 

            if(!userExist.productId) {
                userExist.productId = cartId
                
            }
                /* if there is ProductId the push the new product ids to the document otherwise the older 
                ids will be replaced with new id */
    
            else {
                userExist.productId.push(cartId)
            }

            console.log("Missing product added to cart", addProductToCart);
        }
        
        if(couponCode) {

             const couponExist = await Coupon.find({couponCode})
                // console.log("coupon exist",couponExist[0].discount);
            if(!couponExist){
                throw new Error("Coupon code is invalid")
            }
                    
            let couponDisc = couponExist[0].discount;
            console.log("line 111");
        
            console.log(couponDisc);
        
            // This code executes only if there is a active coupon discount
        
            if(couponDisc)
                {
        
                    let discountAmt = (couponDisc/100) * grossAmt;
                    console.log(discountAmt);
        
                    let netAmt = grossAmt - discountAmt;
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
        
                    const orderPlaced = await Order.create({userId, productId: cartId, name, address, razorpayId, netPrice: netAmt, couponCode, quantity, phoneNo})
                    console.log(orderPlaced);

                    if(orderPlaced) {
                        const deleteOrderedProd = await Cart.findByIdAndDelete(cartId);
                        console.log(deleteOrderedProd);

                        const productFound = await User.updateMany({
                            $pull: { productId: {$in: [prodId]}}
                        })
                        console.log(productFound);
                    }
                     
                    res.status(200).json({
                        success: true,
                        message: "Your order placed successfully",
                        orderPlaced
            
                    })  
                }
        }

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

        var orderPlaced = await Order.create({userId, productId: prodCartId, name, address, razorpayId, netPrice: grossAmt, quantity: qty, phoneNo})
        console.log("Order placed",orderPlaced);
        // return orderPlaced
        res.write(`Your order placed  SUCCESSFULLY ${orderPlaced}`)
    }     
    
    res.end()
   }

    catch(e) {

        res.status(404).json({
            success: false,
            message: e.message
        })

    }
}

// Get all orders

exports.applyCoupon = async (req, res) => {

    try {

        let {prodId} = req.query;
        let {couponCode} = req.query;

        const couponFound = await Coupon.findOne({couponCode});
        console.log("couop",couponCode);

        const couponDisc = couponFound.discount;
        console.log(couponDisc);

        const prod = await Product.findById(prodId);
        console.log(prod.price);

        let price = prod.price;

        const discPrice = price * couponDisc/100;

        price = price - discPrice;

        res.status(200).json({
            success: true,
            message: "Coupon Applied",
            price
        })

    }

    catch(e) {
        
        res.status(402).json({
            success: false,
            message: e.message
        })

    }
}

exports.getAllOrders = async (req, res) => {

    try{

        // Not sure how it works 
        let {userId} = req.query;

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

        const allOrders = await Order.find({});
        let prodId ;
        let getProds = [];
        // console.log("productid of orders",allOrders[0].productId);

        for(let i=0; i<=allOrders.length-1; i++) {

            prodId = allOrders[i].productId;
            prodId = prodId.toString();
            console.log("prodId of orders",prodId);

            let getProdById = await Cart.findById(prodId);

            console.log(getProdById);
              getProds.push( getProdById)


        }


        res.status(200).json({
            success: true,
            message: "Here are all orders of all the customers",
            allOrders,
            getProds
        })
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


// {$match: [{sizeAndStock: size} ,}



