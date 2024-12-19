import { createSlice } from "@reduxjs/toolkit";

// Should i set data as email and password?
const initialState = {
    status: false,
    adminData: null
};

export const adminAuthSlice = createSlice({

    name: "adminAuthSlice",
    initialState,

    reducers: {
        login: (state, action) => {
            state.status = true
            state.adminData = action.payload

            action.type = "ADMIN LOGGEDIN_SUCCESSFULLY"

        },

        logout: (state, action) => {
            state.status = false
            state.adminData = null

            action.type =  "ADMIN LOGGEDOUT SUCCESSFULLY"
        }
    }

});

export const {login, logout} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
