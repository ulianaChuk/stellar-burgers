import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../services/slices/userInfoSlice';

export const AppHeader: FC = () => {
  const { selectUser } = userSelectors;
  const user = useSelector(selectUser);

  return <AppHeaderUI userName={user?.name || ''} />;
};
