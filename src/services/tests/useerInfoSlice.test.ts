import userInfoSlice, {
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  getUserThunk,
  updateUserThunk,
  getOrdersThunk,
  initialState
} from '../slices/userInfoSlice';

describe('userInfoSlice extraReducers', () => {
  it('should handle loginUserThunk.pending', () => {
    const action = { type: loginUserThunk.pending.type };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('should handle loginUserThunk.fulfilled', () => {
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: { id: 1, name: 'User' }
    };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual({ id: 1, name: 'User' });
  });

  it('should handle loginUserThunk.rejected', () => {
    const action = {
      type: loginUserThunk.rejected.type,
      error: { message: 'Error' }
    };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle logoutUserThunk.pending', () => {
    const action = { type: logoutUserThunk.pending.type };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('should handle logoutUserThunk.fulfilled', () => {
    const action = { type: logoutUserThunk.fulfilled.type };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
  });

  it('should handle logoutUserThunk.rejected', () => {
    const action = {
      type: logoutUserThunk.rejected.type,
      error: { message: 'Error' }
    };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle registerUserThunk.pending', () => {
    const action = { type: registerUserThunk.pending.type };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('should handle registerUserThunk.fulfilled', () => {
    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: { id: 1, name: 'User' }
    };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual({ id: 1, name: 'User' });
  });

  it('should handle registerUserThunk.rejected', () => {
    const action = {
      type: registerUserThunk.rejected.type,
      error: { message: 'Error' }
    };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle getUserThunk.pending', () => {
    const action = { type: getUserThunk.pending.type };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('should handle getUserThunk.fulfilled', () => {
    const action = {
      type: getUserThunk.fulfilled.type,
      payload: { user: { id: 1, name: 'User' } }
    };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual({ id: 1, name: 'User' });
    expect(state.isAuth).toBe(true);
  });

  it('should handle getUserThunk.rejected', () => {
    const action = {
      type: getUserThunk.rejected.type,
      error: { message: 'Error' }
    };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle updateUserThunk.pending', () => {
    const action = { type: updateUserThunk.pending.type };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('should handle updateUserThunk.fulfilled', () => {
    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: { user: { id: 1, name: 'Updated User' } }
    };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual({ id: 1, name: 'Updated User' });
  });

  it('should handle updateUserThunk.rejected', () => {
    const action = {
      type: updateUserThunk.rejected.type,
      error: { message: 'Error' }
    };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle getOrdersThunk.pending', () => {
    const action = { type: getOrdersThunk.pending.type };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('should handle getOrdersThunk.fulfilled', () => {
    const action = { type: getOrdersThunk.fulfilled.type };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });

  it('should handle getOrdersThunk.rejected', () => {
    const action = {
      type: getOrdersThunk.rejected.type,
      error: { message: 'Error' }
    };
    const state = userInfoSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error');
  });
});
