// importing dependencies
import { configureStore } from "@reduxjs/toolkit";

// Bringing in reducers
import {cartReducer, addProductToCart, incrementProductCount, decrementProductCount, deleteProductFromCart } from "./slices/cartSlice";
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
    addProductToCart,
    incrementProductCount,
    decrementProductCount,
    deleteProductFromCart,
    loginBegin,
    loginSuccessful,
    loginFailure,
    logout
};