import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   adminAccount: {
    
   }
}

export const signupSlice = createSlice({

    name: "signUp",
    initialState, 

    reducers: {
        addAdminAcc: (state, action) => {
            state.adminAccount.id = action.payload._id
            state.adminAccount.email = action.payload.email
            state.adminAccount.password = action.payload.password
            state.adminAccount.secret = action.payload.secret
            action.type = "ADD_ACCOUNT"

        },

        updateAdminAcc: (state, action) => {
           if(state.adminAccount.id === action.payload.id) 
           state.adminAccount = action.payload;
            
           action.type = "ACCOUNT_UPDATED"

        },

        deleteAdminAcc: (state, action) => {
            if(state.adminAccount.id === action.payload.id)
            state.adminAccount = undefined;

            action.type = "ACCOUNT_DELETED"

        }

    }

});

export const {addAdminAcc, updateAdminAcc, deleteAdminAcc} = signupSlice.actions;
export default signupSlice.reducer;


