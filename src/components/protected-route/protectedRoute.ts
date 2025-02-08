import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../services/slices/userInfoSlice';

type ProtectedRouteProps = {
  element: React.ReactElement;
  unAuthOnly?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  element,
  unAuthOnly = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectUser } = userSelectors;
  const user = useSelector(selectUser);

  if (!user && !unAuthOnly) {
    navigate('/login');
    return;
  }

  if (user && unAuthOnly) {
    const from = location.state?.from || '/';
    navigate('/from');
    return;
  }

  return element;
};
