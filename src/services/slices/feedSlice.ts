import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedsState = {
  orders: TOrder[];
  feedsLoading: boolean;
  order: TOrder | null;
  orderLoading: boolean;
  total: number;
  totalToday: number;
  error: string | null;
};
const initialState: TFeedsState = {
  orders: [],
  feedsLoading: false,
  order: null,
  orderLoading: false,
  total: 0,
  totalToday: 0,
  error: null
};
export const feedsThunk = createAsyncThunk('feeds/getFeeds', getFeedsApi);

export const orderByNumberThunk = createAsyncThunk(
  'orders/getOrder',
  async (number: number) => getOrderByNumberApi(number)
);

const feedsSlice = createSlice({
  name: 'FEEDS_SLICE',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(feedsThunk.pending, (state) => {
        state.feedsLoading = true;
      })
      .addCase(feedsThunk.rejected, (state, action) => {
        state.feedsLoading = false;
        state.error = action.error.message!;
      })
      .addCase(feedsThunk.fulfilled, (state, action) => {
        state.feedsLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(orderByNumberThunk.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(orderByNumberThunk.rejected, (state, action) => {
        state.orderLoading = false;
        state.error = action.error.message!;
      })
      .addCase(orderByNumberThunk.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.order = action.payload.orders[0];
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectFeedsIsLoading: (state) => state.feedsLoading,
    selectOrderIsLoading: (state) => state.orderLoading,
    selectOrder: (state) => state.order,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  }
});

export const feedsSelectors = { ...feedsSlice.selectors };
export const feedsAction = feedsSlice.actions;
export default feedsSlice;
