import ingredientsSlice, { getIngredients } from '../slices/ingredientsSlice';
import { AnyAction } from 'redux';

describe('ingredientsSlice extraReducers', () => {
  const initialState = {
    loading: false,
    error: null,
    ingredients: []
  };

  it('should handle getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Error' }
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: [{ id: 1, name: 'Ingredient 1' }]
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual([{ id: 1, name: 'Ingredient 1' }]);
  });
});
