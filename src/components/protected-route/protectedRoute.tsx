import { FC } from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../services/slices/userInfoSlice';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  element: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  element,
  onlyUnAuth
}) => {
  const { selectUser } = userSelectors;
  const user = useSelector(selectUser);

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' />;
  } else if (onlyUnAuth && user) {
    return <Navigate to='/' />;
  }

  return user && !onlyUnAuth && element;
};
