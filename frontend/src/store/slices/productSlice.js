// Dependencies
import { createSlice } from "@reduxjs/toolkit";

// Bringing in actions
//

// Creating product slice
// This will be used whenever i need to update products
const productSlice = createSlice({
    name: "product",
    initialState: {
        products: []
    },
    reducers: {
        updateProducts(state, action){
            state.products = action.payload;
        }
    }
});


// Exporting reducers
export const { updateProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;
