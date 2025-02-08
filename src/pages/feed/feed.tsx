import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { feedsSelectors, feedsThunk } from '../../services/slices/feedSlice';
import { useAppDispatch } from '../../services/store';
import { useSelector } from 'react-redux';

export const Feed: FC = () => {
  const a = '';
  /** TODO: взять переменную из стора */

  const dispatch = useAppDispatch();

  const { selectOrders } = feedsSelectors;

  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(feedsThunk());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(feedsThunk());
      }}
    />
  );
};
