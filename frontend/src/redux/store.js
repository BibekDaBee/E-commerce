import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/cart/cartSlice'
import authApi from './features/cart/auth/authApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath] : authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});