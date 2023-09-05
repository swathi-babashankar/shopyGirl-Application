import Cart from "../model/cartSchema";
import User from "../model/userSchema";
import Product from "../model/tshirtSchema"

exports.addToCart = async(req, res) => {

    try{

        const {userId} = req.params;
        const {prodId} = req.params;

        const quantity = req.body;
        const price = Product.price;

        const token = req.cookies;

        console.log(price);

        if(!userId || !prodId){
            throw new Error("User and Product ID not found")
        }

        const qty = parseInt(quantity)
        const prodPrice = parseInt(price)

        // Checking if user exist in database using the user ID

        const userFound = await User.findById({userId})

        if(!userFound){
            throw new Error("User not found")
        }

        // Check for token in cookies if present add the product to cart
        if(token === String){

            const productAdded = await Cart.create({prodId, qty, prodPrice, userId})
    
            res.status(202).json({
               success: true,
               message: "Product added to your cart",
               productAdded
            })
        }
        // When we click add to cart from a product the complete copy of that product should be moved to cart
    }

    catch(err){

        res.status(404).json({
            success: true,
            message: err.message
        })
    }
};
