import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE,PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import adminAuthSlice from '../features/admin/adminAuthSlice';
import addProductSlice from '../features/admin/addProductSlice';
import signupSlice from '../features/admin/adminSignupSlice';
import couponSlice from '../features/admin/couponSlice';
import cartSlice from '../features/cart/cartSlice';
import orderSlice from '../features/order/orderSlice';
import userAuthSlice from '../features/user/userAuthSlice';
import userSignupSlice from '../features/user/userSignupSlice';

const persistConfig = {
    key: "root",
    storage
}
const combinedReducers = combineReducers({

        signUp: signupSlice,
        userSignup: userSignupSlice,
        adminAuthSlice: adminAuthSlice,
        userAuthSlice: userAuthSlice,
        addProductSlice: addProductSlice,
        couponSlice: couponSlice,       
        cartSlice: cartSlice,
        order: orderSlice

})



const persistedReducer = persistReducer(persistConfig, combinedReducers)
console.log(persistedReducer);
export const store = configureStore({

    reducer: {
        // signUp: signupSlice,
        // userSignup: userSignupSlice,
        // adminAuthSlice: adminAuthSlice,
        // userAuthSlice: userAuthSlice,
        // addProductSlice: addProductSlice,
        // couponSlice: couponSlice,       
        // cartSlice: cartSlice,
        // order: orderSlice,
        persistedReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, PAUSE, PURGE, REHYDRATE,  PERSIST,  REGISTER]
            }
    })
})

export const persistor = persistStore(store)