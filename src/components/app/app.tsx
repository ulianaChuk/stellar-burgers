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

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppHeader } from '@components';
import { Provider } from 'react-redux';
import store from '../../services/store';
const App = () => (
  <Provider store={store}>
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='*' element={<NotFound404 />} />
          <Route
            path='/feed/:number'
            element={
              <Modal title='Order Info' onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Ingredient Details' onClose={() => {}}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
        </Routes>
      </div>
    </Router>
  </Provider>
);

export default App;
