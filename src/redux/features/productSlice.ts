import { TProduct } from '@/types/product.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



type TInitialStateType = {
    product: TProduct,
    products: TProduct[],
    selectedProduct: TProduct | null
}

const initialState:TInitialStateType  = {
  product: {
    name:'',
    brand:["678a11e6b56dc08b671a1627","678a11f0b56dc08b671a1629","678a3746b56dc08b671a16d9"],
    category:["6789f817b56dc08b671a1612","678a27b8b56dc08b671a165a","678a1128b56dc08b671a1619"]
  } as TProduct,
  products: [],
  selectedProduct: null,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

    setProduct:(state, action: PayloadAction<TProduct>) => {
      // Set Single product 
        state.product = action.payload;
    },
    setProducts: (state, action: PayloadAction<TProduct[]>) => {
      // Set all products
        state.products = action?.payload
    },
    updateProducts: (state, action: PayloadAction<TProduct>) => {
        state.products = [...state.products, action?.payload]
    },
    setSelectedProduct: (state, action: { payload: TProduct | null }) => {
      // Update selected product state
      state.selectedProduct = action?.payload;
    },
   
  },
})

// Action creators are generated for each case reducer function
export const {  setProduct,setProducts,updateProducts,setSelectedProduct } = productSlice.actions

export default productSlice.reducer