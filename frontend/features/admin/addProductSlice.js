import { createSlice } from '@reduxjs/toolkit';
// not sure about id as the databse assigns different id to every product
const initialState = {
    products: [{
        id: "2001",
        name: "Red t shirt",
        brand: "Puma",
        category: "Half Sleeve",
        price: 2999,
        image: "https://assets.ajio.com/medias/sys_master/root/20230605/7Rzg/647dcf50d55b7d0c634c348b/-473Wx593H-441926311-red-MODEL2.jpg",
        discount: 0
    }]
};

export const addProductSlice = createSlice({
    name: "addProductSlice",
    initialState,

    reducers: {

        addProduct: (state, action) => {

            const product = {
                id: action.payload._id,
                name: action.payload.name,
                brand: action.payload.brand,
                category: action.payload.category,
                price: action.payload.price,
                image: action.payload.image,
                discount: action.payload.discount
            }

            state.products.push(product)
        },

        updateProduct: (state, action) => {
           if(state.products.map((product) => product.id === action.payload.id )){

              const prodFound =  state.products.find(action.payload.id)

              prodFound.image = action.payload.image
              prodFound.price = action.payload.price
              prodFound.discount = action.payload.discount
              prodFound.category = action.payload.category

            }

            action.type = "PRODUCT_UPDATED"

        },

        updateProductByBrand: (state, action) => {
            const prodFound =  state.products.find(action.payload.brand)
            prodFound.price = action.payload.price
            prodFound.discount = action.payload.discount

            action.type = "PRODUCT_UPDATED"

        },

        removeProduct: (state, action) => {
            state.products = state.products.filter((prod) => prod.id !== action.payload.id)

            action.type = "PRODUCT_DELETED"
        }

    }

});

export const {addProduct, updateProduct, updateProductByBrand, removeProduct} = addProductSlice.actions;
export default addProductSlice.reducer;