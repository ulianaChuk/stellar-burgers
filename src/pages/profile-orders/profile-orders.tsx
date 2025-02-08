import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { feedsSelectors } from '../../services/slices/feedSlice';
import { useAppDispatch } from '../../services/store';
import { getOrdersThunk } from '../../services/slices/userInfoSlice';
import { useSelector } from 'react-redux';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const { selectOrders } = feedsSelectors;
  const orders: TOrder[] = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
