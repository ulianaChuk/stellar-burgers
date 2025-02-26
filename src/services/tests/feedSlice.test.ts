import feedSlice, {
  feedsThunk,
  orderByNumberThunk,
  initialState
} from '../slices/feedSlice';

describe('feedSlice extraReducers', () => {
  // const initialState = {
  //   feedsLoading: false,
  //   orderLoading: false,
  //   orders: [],
  //   total: 0,
  //   totalToday: 0,
  //   order: null,
  //   error: null
  // };

  it('should handle feedsThunk.pending', () => {
    const action = { type: feedsThunk.pending.type };
    const state = feedSlice.reducer(initialState, action);
    expect(state.feedsLoading).toBe(true);
  });

  it('should handle feedsThunk.rejected', () => {
    const action = {
      type: feedsThunk.rejected.type,
      error: { message: 'Error' }
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.feedsLoading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle feedsThunk.fulfilled', () => {
    const action = {
      type: feedsThunk.fulfilled.type,
      payload: { orders: [{ id: 1 }], total: 100, totalToday: 10 }
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.feedsLoading).toBe(false);
    expect(state.orders).toEqual([{ id: 1 }]);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('should handle orderByNumberThunk.pending', () => {
    const action = { type: orderByNumberThunk.pending.type };
    const state = feedSlice.reducer(initialState, action);
    expect(state.orderLoading).toBe(true);
  });

  it('should handle orderByNumberThunk.rejected', () => {
    const action = {
      type: orderByNumberThunk.rejected.type,
      error: { message: 'Error' }
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.orderLoading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle orderByNumberThunk.fulfilled', () => {
    const action = {
      type: orderByNumberThunk.fulfilled.type,
      payload: { orders: [{ id: 1 }] }
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.orderLoading).toBe(false);
    expect(state.order).toEqual({ id: 1 });
  });
});
