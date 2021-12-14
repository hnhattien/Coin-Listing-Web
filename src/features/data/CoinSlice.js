import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState = {
    data: {
       
    },
    error: null
}
const coinSlice = createSlice({
    name: "coin",
    initialState: initialState,
    reducers: {
        
        successHanlde : (state, action) => {
            
        },
        failedHanlde : (state, action) => {
            
        }
    }
})

export const { } = coinSlice.actions;

export default coinSlice.reducer;