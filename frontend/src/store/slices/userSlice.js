// Dependencies
import { createSlice } from "@reduxjs/toolkit";

// Bringing in actions
//

// Creating cart slice
// Those reducers will generally be used in "components/Login.js" 
const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser : null, // will be updated with successful login
        isFetching : false,
        error: false
    },
    reducers: {
        loginBegin(state, action){
            state.isFetching = true; // Fetching now...
            state.error = false; // Cancel error for the next
        },
        loginSuccessful(state, action){
            state.isFetching = false; // Fetching is over.
            state.currentUser = action.payload; // Current user is updated.
        },
        loginFailure(state, action){
            state.isFetching = false; // Fetching is over.
            state.error = true; // Error is thrown.
        },
        logout(state, action){
            state.currentUser = null; // No current user now.
        }
    }
});


// Exporting reducers
export const { loginBegin, loginSuccessful, loginFailure, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
