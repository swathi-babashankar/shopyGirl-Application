import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

export const userAuthSlice = createSlice({

    name: "userAuthSlice",
    initialState,

    reducers: {

        login: (state, action) => {
            state.status = true
            state.userData = action.payload
            // state.userData.email = action.payload.email
            // state.userData.password = action.payload.password

            action.type = "USER_LOGGEDIN_SUCCESSFULLY"
        },

        logout: (state, action) => {
            state.status = false,
            state.userData = null

            action.type = "USER_LOGGEDOUT_SUCCESSFULLY"
        }

    }

})

export const {login, logout} = userAuthSlice.actions;
export default userAuthSlice.reducer;