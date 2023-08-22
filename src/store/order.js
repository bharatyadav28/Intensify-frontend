import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderId: (state, actions) => {
      state.orderId = actions.payload.orderId;
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice;
