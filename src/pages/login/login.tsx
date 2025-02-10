import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useSelector } from '../../services/store';
import {
  loginUserThunk,
  userSelectors
} from '../../services/slices/userInfoSlice';

export const Login: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectError } = userSelectors;
  const loginError = useSelector(selectError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginUserThunk({ email, password })).unwrap();
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {}
  };

  return (
    <LoginUI
      errorText={loginError ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
