import { configureStore } from "@reduxjs/toolkit";
import  productReducer  from "./features/productSlice";
import  authReducer  from "./features/authSlice";
import  categoryReducer  from "./features/categorySlice";
import  brandReducer  from "./features/brandSlice";
import  mediaReducer  from "./features/meidaSlice";

export  const store = configureStore({
    reducer:{
        product: productReducer,
        auth: authReducer,
        category: categoryReducer,
        brand: brandReducer,
        media: mediaReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch