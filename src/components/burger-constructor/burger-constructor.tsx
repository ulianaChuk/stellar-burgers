import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { burgerConstructorSelectors } from '../../services/slices/burgerConstructorSlice';
import { useSelector } from 'react-redux';
import { orderSelectors } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { selectBurgerConstructor } = burgerConstructorSelectors;
  const { selectIsLoading, selectOrder } = orderSelectors;
  const constructorItems = useSelector(selectBurgerConstructor);

  const orderRequest = useSelector(selectIsLoading);
  const orderModalData = useSelector(selectOrder);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
