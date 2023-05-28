// Dependencies
import { createSlice } from "@reduxjs/toolkit";

// Bringing in actions
//

// Creating notification slice
// Those reducers will generally be used everywhere when i need a notification
const notificationSlice = createSlice({
    name: "notification",
    initialState: [],
    reducers: {
        addNotification(state, action){
            state.push(action.payload);
        }
    },
    extraReducers(builder) {
        builder.addCase("user/logout", function(state, action){
            state.push("Hope to see you again!");
        });
    }
});


// Exporting reducers
export const { addNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
