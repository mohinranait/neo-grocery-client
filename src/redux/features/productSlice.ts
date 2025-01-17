import { TProduct } from '@/types/product.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



type TInitialStateType = {
    product: TProduct,
    products: TProduct[],
}

const initialState:TInitialStateType  = {
  product: {
    name:'Product name',
    price:{
        productPrice:10
    },
    manageStock:false,
    brand:["678a11e6b56dc08b671a1627","678a11f0b56dc08b671a1629","678a3746b56dc08b671a16d9"]
  } as TProduct,
  products: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

    setProduct:(state, action: PayloadAction<TProduct>) => {
        state.product = action.payload;
    },
    setProducts: (state, action: PayloadAction<TProduct[]>) => {
        state.products = action?.payload
    },
    updateProducts: (state, action: PayloadAction<TProduct>) => {
        state.products = [...state.products, action?.payload]
    },

   
  },
})

// Action creators are generated for each case reducer function
export const {  setProduct,setProducts,updateProducts } = productSlice.actions

export default productSlice.reducer