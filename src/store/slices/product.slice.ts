import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  avatar: string;
  des: string;
  price: number;
}

const initialState = null;

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductData: function (state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
});

export const productAction = {
  ...productSlice.actions,
};

export const productReducer = productSlice.reducer;
