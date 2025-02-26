import burgerConstructorSlice, {
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearBurgerConstructor
} from '../slices/burgerConstructorSlice';

describe('Тестирование burgerConstructorSlice', () => {
  const initialState = {
    burgerConstructor: {
      bun: null,
      ingredients: []
    },
    error: null
  };

  const bun = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const ingredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  it('добавить булку', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );
    expect(typeof state.burgerConstructor?.bun?.id).toBe('string');
    expect(state.burgerConstructor.bun?.name).toEqual('Краторная булка N-200i');
  });

  it('добавить ингредиент', () => {
    const state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient)
    );
    expect(typeof state.burgerConstructor?.ingredients[0].id).toBe('string');
    expect(state.burgerConstructor.ingredients[0].name).toEqual(
      'Биокотлета из марсианской Магнолии'
    );
  });

  it('удаление ингредиента', () => {
    const stateWithIngredient = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient)
    );
    const state = burgerConstructorSlice.reducer(
      stateWithIngredient,
      deleteIngredient(stateWithIngredient.burgerConstructor.ingredients[0])
    );
    expect(state.burgerConstructor.ingredients).toHaveLength(0);
  });

  it('перемещение ингредиента вверх', () => {
    const stateWithIngredients = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient)
    );
    const stateWithTwoIngredients = burgerConstructorSlice.reducer(
      stateWithIngredients,
      addIngredient({ ...ingredient, _id: '643d69a5c3f7b9001cfa0942' })
    );
    const state = burgerConstructorSlice.reducer(
      stateWithTwoIngredients,
      moveIngredientUp(1)
    );
    expect(state.burgerConstructor.ingredients[0]._id).toEqual(
      '643d69a5c3f7b9001cfa0942'
    );
    expect(state.burgerConstructor.ingredients[1]._id).toEqual(
      '643d69a5c3f7b9001cfa0941'
    );
  });

  it('перемещение ингредиента вниз', () => {
    const stateWithIngredients = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient)
    );
    const stateWithTwoIngredients = burgerConstructorSlice.reducer(
      stateWithIngredients,
      addIngredient({ ...ingredient, _id: '643d69a5c3f7b9001cfa0942' })
    );
    const state = burgerConstructorSlice.reducer(
      stateWithTwoIngredients,
      moveIngredientDown(0)
    );
    expect(state.burgerConstructor.ingredients[0]._id).toEqual(
      '643d69a5c3f7b9001cfa0942'
    );
    expect(state.burgerConstructor.ingredients[1]._id).toEqual(
      '643d69a5c3f7b9001cfa0941'
    );
  });

  it('очистка конструктора', () => {
    const stateWithIngredients = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredient)
    );
    const state = burgerConstructorSlice.reducer(
      stateWithIngredients,
      clearBurgerConstructor()
    );
    expect(state.burgerConstructor.bun).toBeNull();
    expect(state.burgerConstructor.ingredients).toHaveLength(0);
  });
});
