import { createSlice } from "@reduxjs/toolkit";

const initialState ={
users: [{
    id: 12111,
    name: "user1",
    email: "user12111@gmail.com",
    password: "user1234",
    phoneNo: "94951212599"
}]
};
export const userSignupSlice = createSlice({
    name: "userSignup",
    initialState,

    reducers: {

        addAccount: (state, action) => {
            const user = {
                id: action.payload._id,
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                phoneNo: action.payload.phoneNo
            }
            state.users.push(user)
        },

        updateAccount: (state, action) => {
            state.users.map((user) => {
                if(user.email === action.payload.email){
                    user = action.payload
                }
            })
        },

        deleteAccount: (state, action) => {
           state.users = state.users.filter((user) => user.id !== action.payload.id)
        },

    }
})

export const {addAccount, updateAccount, deleteAccount} = userSignupSlice.actions;
export default userSignupSlice.reducer;