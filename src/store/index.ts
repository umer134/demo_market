import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productsApi } from '@/store/api/productsApi';
import cartReducer from '@/store/slices/cartSlice';
import phoneReducer from '@/store/slices/phoneSlice';
import { reviewsApi } from "./api/reviewsApi";

const rootReducer = combineReducers({
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
    phone: phoneReducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'phone'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // чтобы не ругался на объекты RTK Query
    }).concat(productsApi.middleware, reviewsApi.middleware)
});

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch