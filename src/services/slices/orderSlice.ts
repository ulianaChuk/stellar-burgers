import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi } from '../../utils/burger-api';

type TOrderState = {
  order: TOrder | null;
  loading: boolean;
  error: null | string;
};
const initialState: TOrderState = {
  order: null,
  loading: false,
  error: null
};

const orderThunk = createAsyncThunk(
  'orders/postOrder',
  async (order: string[]) => {
    const response = await orderBurgerApi(order);
    return response;
  }
);

const orderSlice = createSlice({
  name: ' ORDER_SLICE',
  initialState: initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message!;
      })
      .addCase(orderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      });
  },
  selectors: {
    selectIsLoading: (state) => state.loading,
    selectOrder: (state) => state.order
  }
});

export const orderSelectors = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
export default orderSlice;
