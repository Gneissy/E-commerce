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
        addProduct(state, action){
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
        }
    }
});


// Exporting reducers
export const { addProduct } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
