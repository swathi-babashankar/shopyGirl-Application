import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    orders: [{}]
}
// What about the total amount?
export const orderSlice = createSlice({
    name: "order",
    initialState,

    reducers: {

        placeOrder: (state, action) => {
           const order = {
            id: nanoid(),
            product: action.payload.products,
            grossAmt: action.payload.grossAmt,
            address: action.payload.address,
            phoneNo: action.payload.phoneNo,
            couponCode: action.payload.couponCode,
            }

            state.orders.push(order)
            action.type = "ORDER_PLACED"
        },

        updateOrder: (state, action) => {
            state.orders.address = action.payload.address,
            state.orders.phoneNo = action.payload.phoneNo,
            state.action.couponCode = action.payload.couponCode

            action.type = "ORDER_DETAILS_UPDATED"
        },

        cancelOrder: (state, action) => {
            state.orders.id = action.payload
            state.orders = state.orders.filter((order) => order.id !== action.payload.id)

            const prod = state.orders.find(action.payload.id)
            let prodPrice = prod.product.totalAmt
            state.orders.grossAmt = state.orders.grossAmt - prodPrice
            
            action.type = "ORDER_CANCELLED"
        }
    }

})

export const {placeOrder, updateOrder, cancelOrder} = orderSlice.actions;
export default orderSlice.reducer;