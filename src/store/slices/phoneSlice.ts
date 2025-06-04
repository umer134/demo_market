import { PhoneState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PhoneState = {
    number: ''
}

const phoneSlice = createSlice({
    name: 'phone',
    initialState,
    reducers: {
        setPhone: (state, action: PayloadAction<string>) => {
            state.number = action.payload
        }
    }
});

export const { setPhone } = phoneSlice.actions;
export default phoneSlice.reducer;