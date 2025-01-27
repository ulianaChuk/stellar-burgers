import { useAppDispatch, useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import {
  getIngredients,
  ingredientsSelectors
} from '../../services/slices/ingredientsSlice';
// import { burgerConstructorSelectors } from 'src/services/slices/burgerConstructorSlice';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const { selectIsLoading } = ingredientsSelectors;
  const isIngredientsLoading = useSelector(selectIsLoading);
  // const {selectBurgerConstructor} = burgerConstructorSelectors;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
