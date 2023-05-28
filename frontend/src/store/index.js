// importing dependencies
import { configureStore } from "@reduxjs/toolkit";

// Bringing in reducers
import {cartReducer, addProductToCart, incrementProductCount, decrementProductCount, deleteProductFromCart } from "./slices/cartSlice";
import {userReducer, loginBegin, loginSuccessful, loginFailure, logout } from "./slices/userSlice";
import { notificationReducer, addNotification } from "./slices/notificationSlice";


// Bringing in actions
//

// Creating store
const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        notification: notificationReducer
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
    logout,
    addNotification
};