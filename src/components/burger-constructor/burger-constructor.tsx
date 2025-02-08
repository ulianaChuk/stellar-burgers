import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  burgerConstructorSelectors,
  clearBurgerConstructor
} from '../../services/slices/burgerConstructorSlice';
import { useSelector } from 'react-redux';
import {
  clearOrder,
  orderSelectors,
  orderThunk
} from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { userSelectors } from '../../services/slices/userInfoSlice';
import { useAppDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { selectBurgerConstructor } = burgerConstructorSelectors;
  const { selectIsLoading, selectOrder } = orderSelectors;
  const { selectUser } = userSelectors;

  const constructorItems = useSelector(selectBurgerConstructor);
  const user = useSelector(selectUser);
  const orderRequest = useSelector(selectIsLoading);
  const orderModalData = useSelector(selectOrder);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;
    const { bun, ingredients } = constructorItems;

    const orderData: string[] = [
      bun?._id!,
      ...ingredients.map((ingredient) => ingredient._id),
      bun?._id!
    ];
    dispatch(orderThunk(orderData));
  };
  const closeOrderModal = () => {
    navigate('/', { replace: true });
    dispatch(clearOrder());
    dispatch(clearBurgerConstructor());
  };

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
