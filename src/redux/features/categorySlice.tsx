import { createSlice } from "@reduxjs/toolkit";
import { TCategoryType } from "@/types/category.type";

type TAddCategorPaylaod = {
  data: TCategoryType[] | TCategoryType;
  type: "Array" | "Single";
};

type TInitialStateType = {
  selectedCategory: TCategoryType | null;
  categories: TCategoryType[];
};

const initialState: TInitialStateType = {
  selectedCategory: null,
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: { payload: TAddCategorPaylaod }) => {
      // Update categories state
      const { data, type } = action.payload;
      if (type !== "Array") {
        // When come single category
        state.categories = [...state?.categories, data as TCategoryType];
      } else {
        // When come categories array
        state.categories = [...(data as TCategoryType[])];
      }
    },
    setSelectedCategory: (state, action: { payload: TCategoryType | null }) => {
      // Update selectedCategory state
      state.selectedCategory = action?.payload;
    },
  },
});

export const { addCategory, setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
