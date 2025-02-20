import { FC } from 'react';
import { userSelectors } from '../../services/slices/userInfoSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  element: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  element,
  onlyUnAuth = false
}) => {
  const location = useLocation();
  const { selectUser, selectIsAuth } = userSelectors;
  const user = useSelector(selectUser);
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Preloader />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  if (user && onlyUnAuth) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  return element;
};
