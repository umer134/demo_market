import { CartState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        addItem: (state, action: PayloadAction<{id:number}>) => {
            const exists = state.items.find(i => i.id === action.payload.id)
            if (exists) {
                exists.quantity += 1;
            } else {
                state.items.push({ id: action.payload.id, quantity: 1 })
            }
        },
        removeItem: (state, action: PayloadAction<{id: number}>) => {
            const idx = state.items.findIndex(i => i.id === action.payload.id);
            if(idx !== -1) state.items.splice(idx, 1) 
        },
        setQuantity: (state, action: PayloadAction<{id: number, quantity: number}>) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if(item) item.quantity = action.payload.quantity;
        },
        setPrice: (state, action: PayloadAction<{id:number, price: number}>) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if(item) item.price = action.payload.price;
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});


export const { addItem, removeItem, setQuantity, setPrice, clearCart } = cartSlice.actions;
export default cartSlice.reducer;