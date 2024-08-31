import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import themeReducer from './features/theme/themeSlice'; // Import the theme reducer

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer, // Add the theme reducer to the store
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
