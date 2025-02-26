import orderSlice, { orderThunk } from '../slices/orderSlice';

describe('orderSlice extraReducers', () => {
  const initialState = {
    loading: false,
    error: null,
    order: null
  };

  it('should handle orderThunk.pending', () => {
    const action = { type: orderThunk.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle orderThunk.rejected', () => {
    const action = {
      type: orderThunk.rejected.type,
      error: { message: 'Error' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle orderThunk.fulfilled', () => {
    const action = {
      type: orderThunk.fulfilled.type,
      payload: { order: { id: 1, name: 'Order 1' } }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.order).toEqual({ id: 1, name: 'Order 1' });
  });
});
