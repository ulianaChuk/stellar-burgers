import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { OrderInfo, IngredientDetails } from '@components';
import { ModalUI as Modal } from '../../components/ui/modal';
import '../../index.css';
import styles from './app.module.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation
} from 'react-router-dom';
import { AppHeader } from '@components';
import { useAppDispatch } from '../../services/store';
import { getUserThunk } from '../../services/slices/userInfoSlice';
import { useEffect } from 'react';
import { ProtectedRoute } from '../protected-route/protectedRoute';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { background?: Location };

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={<ProtectedRoute element={<Login />} onlyUnAuth />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute element={<Register />} onlyUnAuth />}
        />

        <Route
          path='/forgot-password'
          element={<ProtectedRoute element={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute element={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {state && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Информация о заказе'} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title={'Информация о заказе'} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
