import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    coupons: [{
        id: 121,
        couponCode: "SWA123",
        discount: 10,
        validTill: new Date(Date.now(2*24*60*60*1000))
    }]
};

export const couponSlice = createSlice({
    name: "couponSlice",
    initialState,

    reducers: {

        addCoupon: (state, action) => {
            const coupon = {
                id: nanoid(),
                couponCode: action.payload.couponCode,
                discount: action.payload.discount,
                validTill: action.payload.validTill
            }
            state.coupons.push(coupon)

            action.type = "ADD_COUPON"
        },

        updateCoupon: (state, action) => {
            state.coupons.map((coupon)=>{
                if(coupon.id === action.payload.id){
                    coupon.couponCode = action.payload.couponCode
                    coupon.discount = action.payload.discount
                    coupon.validTill = action.payload.validTill
                }
            })
            action.type = "COUPON_UPDATED"
        },

        deleteCoupon: (state, action) => {
            state.coupons = state.coupons.filter((coupon) =>coupon.id!== action.payload.id)

            action.payload = "COUPON_DELETED"
        },

    }
})

export const {addCoupon, updateCoupon, deleteCoupon} = couponSlice.actions;
export default couponSlice.reducer;