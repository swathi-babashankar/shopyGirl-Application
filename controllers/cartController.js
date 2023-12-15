const Cart = require("../model/cartSchema");
const User = require("../model/userSchema");
const Product = require("../model/tshirtSchema");
const { ObjectId } = require("mongodb");

exports.addToCart = async(req, res) => {

    try{

        let {userId} = req.query;

        console.log(userId);
        const {prodId} = req.query;

        const {quantity} = req.body;
        
        
        // const {token} = req.cookies;

        if(!userId || !prodId){
            throw new Error("User and Product ID not found")
        }

        // Checking if user exist in database using the user ID

        const userFound = await User.findById(userId)
        console.log("user found",userFound.id);

        if(!userFound){
            throw new Error("User not found")
        }

        const productExist = await Cart.findById(prodId);
        console.log("product exist",productExist);

        if(productExist){
            throw new Error("Product already exist in your cart")
        }

        // Check for token in cookies if present add the product to cart

        const product =  await Product.findById(prodId);
        console.log(product);

        // When we click add to cart from a product the complete copy of that product should be moved to cart
        const productAdded = await Cart.create({ quantity, product, userId})

        console.log("Product added", productAdded);

        // If there is no productId is in the object add the id got from the response as array

        if(!userFound.productId){
            userFound.productId = [productAdded.id]
            
        }
            /* if there is ProductId the push the new product ids to the document otherwise the older 
            ids will be replaced with new id */

        else {
            userFound.productId.push(productAdded.id)
        }

        userFound.save()
        productAdded.save()
    
        res.status(202).json({
            success: true,
            message: "Product added to your cart",
            productAdded
        })
        
        
    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

exports.getItems = async(req, res) => {

    try {

        const itemsInCart = await Cart.find({});

        res.status(202).json({
            success: true,
            message: "Items fetched successfully",
            itemsInCart
        })
    }

    catch(err) {

        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

exports.getItemsByUserId = async(req, res) => {

    try {

        const {userId} = req.query;

        const userCartItems = await Cart.find({userId});

        if(!userCartItems){
            throw new Error("Your cart is empty")
        }

        res.status(202).json({
            success: true,
            message: "Your cart items fetched successfully",
            userCartItems
        })
    }

    catch(err) {

        res.status(404).json({
            success: false,
            message: err.message
        })
    }
};

exports.editCart = async(req, res) => {

    try {

        const {prodId} = req.query;
        const {userId} = req.query
        const {quantity} = req.body;

        // const productInCart = await Cart.find({userId: { $in: userId} })

        // Want to update only specified user's product in cart 
        //=> Find the product using productId
        //2. Check whether the specified userId present in the product
        //3. if true then update the user's cart item and same for deleteCartItem

        const product = await Cart.findById(prodId);

        if(product.userId == userId){

            console.log("this product is in your cart", product);
            const updatedCart = await Cart.findByIdAndUpdate(prodId, { quantity })

        res.status(202).json({
            success: true,
            message: "Product updated successfully",
            updatedCart
        })
    }

    else {
        throw new Error("This product is not in your cart")
    }
    

    }

    catch(err) {

        res.status(404).json({
            success: false,
            message: err.message
        })

    }
}

exports.deleteCartItem = async(req, res) => {

    try {

        const {prodId} = req.query; 
        const {userId} = req.query;


        const product = await Cart.findById(prodId);

        if(product.userId == userId)
        {

            console.log("this product is in your cart", product);
            // 1. If i remove a product from the cart then its ID should be removed from user model productId field

            const prodDeleted = await Cart.findByIdAndDelete(prodId);

            //1. To identify the ID of the product that got removed from cart but its reference Id still exists in user object
           //2. remove the particular ID from user doc productId field using aggregation $pull 
          //3. Only from this particular user

       
            const productFound = await User.updateMany({
                $pull:{productId: {$in: [prodId]}}
            })

            console.log("productfround",productFound);

            res.status(202).json({
                success: true,
                message: "Cart item deleted successfully",
                prodDeleted
            })
        }

        else{
            throw new Error("none")
        }

    }

    catch(err){

        res.status(404).json({
            success: false,
            message: err.message

        })

    }
}

