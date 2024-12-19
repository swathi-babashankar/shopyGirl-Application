import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState = {
    cartProucts: [{
        id: 1211,
        product: "err",
        quanity: 1,
        totalAmt: 0
    }],
    // what if i store gross amount outside the cart prods array
    // how can we grab the amount of every prod and total it => will map work?
    grossAmount: 0
}

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState,

    reducers: {

        addToCart: (state, action) => {
            state.cartProucts.id = action.payload._id

            action.type = "ADD_TO_CART"
        },

        addedToCat: (state, action) => {

            const productToCart = {
                id: action.payload._id,
                product: action.payload.product,
                quanity: action.payload.quantity,
                totalAmt: action.payload.price * action.payload.quantity
            }

            state.cartProucts.push(productToCart)

             for(let i=0; i<=state.cartProucts.length; i++){
                let grossAmount = state.grossAmount + state.cartProucts[i]?.totalAmt 
                state.grossAmount = grossAmount;
            }

            action.type = "ADDED_TO_CART"
        },

        updateCartIncrease: (state, action) => {
            // id of the qty product user want to update
            state.cartProucts.map((cartProd) =>{

                if(cartProd.id === action.payload.id){
                    let initialAmt = cartProd.product.price
                    cartProd.quanity = cartProd.quanity + action.payload.quanity

                    // amount of the product and change the total amt
                     let newTotalAmt = cartProd.product.price * cartProd.quanity
                     cartProd.totalAmt = newTotalAmt

                    //  this is to get the gross amount by adding only difference amt else this should be calculated all over again
                     let diffAmt = newTotalAmt - initialAmt
                     state.grossAmount = state.grossAmount + diffAmt
                }     
            }) 
            action.type = "UPDATE_CART_INCREMENT"
        },

        updateCartdecrease: (state, action) => {

            state.cartProucts.map((cartProd) =>{

                if(cartProd.id === action.payload.id){
                    let initialAmt = cartProd.product.price
                    cartProd.quanity = cartProd.quanity - action.payload.quanity

                    // amount of the product and change the total amt
                     let newTotalAmt = cartProd.product.price * cartProd.quanity
                     cartProd.totalAmt = newTotalAmt

                    //  this is to get the gross amount by adding only difference amt else this should be calculated all over again
                     let diffAmt = initialAmt - newTotalAmt 
                     state.grossAmount = state.grossAmount - diffAmt
                }     
            }) 
            action.type = "UPDATE_CART_DECREMENT"
        },

        removeFromCart: (state, action) => {
         state.cartProucts = state.cartProucts.filter((cartProd) => cartProd.id !== action.payload.id )

         state.cartProucts.map((cartProd) =>{
            if(cartProd.id === action.payload.id){
              state.grossAmount = state.grossAmount - cartProd.totalAmt
            }
         })
         action.type = "PRODUCT_REMOVED_FROM_CART"
        }

    }
})

export const {addToCart, addedToCat, updateCartIncrease, updateCartdecrease, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;