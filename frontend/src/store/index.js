// importing dependencies
import { configureStore } from "@reduxjs/toolkit";

// Bringing in reducers
import {cartReducer, addProduct } from "./slices/cartSlice";
import {userReducer, loginBegin, loginSuccessful, loginFailure, logout } from "./slices/userSlice";


// Bringing in actions
//

// Creating store
const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer
    }
});

// Exporting both store and reducers
export {
    store,
    addProduct,
    loginBegin,
    loginSuccessful,
    loginFailure,
    logout
};