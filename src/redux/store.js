import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit"
import authReducer from "./features/authSlice"
import productsReducer from "./features/productsSlice"
import filterReducer from "./features/filterSlice"
import cartReducer from "./features/cartSlice"
import checkoutReducer from "./features/checkoutSlice"
import orderReducer from "./features/orderSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    filter: filterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer
    })

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export default store