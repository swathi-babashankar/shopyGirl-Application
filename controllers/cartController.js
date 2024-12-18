const Cart = require("../model/cartSchema");
const User = require("../model/userSchema");
const Product = require("../model/tshirtSchema");
const { ObjectId } = require("mongodb");

exports.addToCart = async(req, res) => {

    try{

        let {userId} = req.query;

        console.log(userId);
        const {prodId} = req.query;

        const {quantity, size} = req.body;
        
        
        // const {token} = req.cookies;

        if(!userId || !prodId){
            throw new Error("User and Product ID not found")
        }

        // Checking if user exist in database using the user ID

        const userFound = await User.findById(userId);
        console.log("user found",userFound.id);

        if(!userFound){
            throw new Error("User not found")
        }

        // find whether this prodId is already there in user not in cart, cart doc may have other users product

        // const productExist = await Cart.findById(prodId);
        // console.log("product exist",productExist);

        const productInCart = await Cart.find({ $and: [{userId: {$in: [userId]}}, {"product._id": {$in: [prodId]}}]});
        console.log("product already in cart",productInCart);

        if(productInCart[0]?._id) {
            throw new Error("Product already exist in your cart")
        }

        const product =  await Product.findById(prodId);
        console.log(product);

        // When we click add to cart from a product the complete copy of that product should be moved to cart
        const productAdded = await Cart.create({ quantity, product, userId, size});

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

        userFound.save();
        productAdded.save();
    
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
            itemsInCart,
            
        })
    }

    catch(err) {

        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

exports.getItemById = async(req, res) => {

    try {

        const { prodId } = req.query;

        const cartItem = await Cart.findById(prodId);

        res.status(200).json({
            success: true,
            message: "Item Fetched Successfully",
            cartItem
        })

    }

    catch(e) {

        res.status(404).json({
            success: false,
            message: e.message
        })
    }
}

exports.getItemsByUserId = async(req, res) => {

    try {

        const {userId} = req.query;
        let totalAmtOfItems = 0;

        const userCartItems = await Cart.find({userId});

        if(!userCartItems){
            throw new Error("Your cart is empty")
        }

        for(let a=0; a<userCartItems.length; a++) {

            let price = userCartItems[a]?.product[0].price * userCartItems[a]?.quantity;
            totalAmtOfItems = totalAmtOfItems + price;
            console.log("total amt", totalAmtOfItems);

        }


        res.status(202).json({
            success: true,
            message: "Your cart items fetched successfully",
            userCartItems,
            totalAmtOfItems
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
        const {quantity, size} = req.body;

        // const productInCart = await Cart.find({userId: { $in: userId} })

        // Want to update only specified user's product in cart 
        //=> Find the product using productId
        //2. Check whether the specified userId present in the product
        //3. if true then update the user's cart item and same for deleteCartItem

        const product = await Cart.findById(prodId);
        console.log("upating cartprod", product.userId);

        if(product.userId.toString() === userId){

            console.log("this product is in your cart", product);
            const updatedCart = await Cart.findByIdAndUpdate(prodId,  {quantity, size} )

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

        const { prodId } = req.query; 
        const { userId } = req.query;
        
        
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

            console.log("productfround",productFound)

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

