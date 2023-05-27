// Dependencies
import { createSlice } from "@reduxjs/toolkit";

// Bringing in actions
//

// Creating cart slice
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        totalPrice: 0
    },
    reducers: {
        addProductToCart(state, action){
            state.quantity += action.payload.count; // this is total item count will be seen in cart img
            state.products.push(action.payload); // sending whole payload object into the products array
            state.totalPrice += action.payload.price * action.payload.count;

            //! action.payload looks something like this: 
            //! { 
            //!     { _id: 123a1e24, title: "Polo T-shirt", img: "hedehode.png" ... }, 
            //!     price: 55,
            //!     count: 2, 
            //!     size: l, 
            //!     color: red ...
            //! } 
            // console.log(action.payload.title); 
            //* so action.payload.title works in that way.
        },
        incrementProductCount(state, action){
            state.products[action.payload.index].count += 1; 
            state.totalPrice += action.payload.price; 
            state.quantity += 1;
        },
        decrementProductCount(state, action){
            if (state.products[action.payload.index].count > 0){
                state.products[action.payload.index].count -= 1;
                state.totalPrice -= action.payload.price;
                state.quantity -= 1;

                if (state.products[action.payload.index].count === 0){ // If 0,
                    state.products.splice(action.payload.index, 1); // Also delete item from cart
                }
            }
        },
        deleteProductFromCart(state, action){
            const {index, price, count} = action.payload;

            state.products.splice(index, 1); // Delete item from cart
            state.totalPrice -= price * count; // Update total price
            state.quantity -= count; // Update cart total item quantity
        }
    }
});


// Exporting reducers
export const { addProductToCart, incrementProductCount, decrementProductCount, deleteProductFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
