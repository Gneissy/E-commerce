// importing dependencies
import { configureStore } from "@reduxjs/toolkit";

// Bringing in reducers
import { cartReducer, addProductToCart, incrementProductCount, decrementProductCount, deleteProductFromCart } from "./slices/cartSlice";
import { userReducer, loginBegin, loginSuccessful, loginFailure, logout } from "./slices/userSlice";
import { notificationReducer, addNotification } from "./slices/notificationSlice";
import { productReducer, updateProducts } from "./slices/productSlice";


// Bringing in actions
//

// Creating store
const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        notification: notificationReducer,
        product: productReducer
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
    addNotification,
    updateProducts
};