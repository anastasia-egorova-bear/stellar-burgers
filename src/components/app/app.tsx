import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Protected } from '../protected-route/protectedRoute';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
// import { Preloader } from '@ui';
import { checkUserAuth } from '../../services/slice/userSlice';
import { selectIngredients } from 'src/services/slice/ingredientsSlice';
// import { selectLoading } from 'src/services/slice/ingredientsSlice';

const App = () => {
  const dispatch = useDispatch();
  // const ingredients = useSelector(selectIngredients);
  // const ordersFeed = useSelector(selectFeed);
  // const isLoading = useSelector(selectLoading);
  // const isModalOpenedIngridient = useSelector(selectModalIngridient);
  // const isModalOpenedOrder = useSelector(selectModalOrder);
  const location = useLocation();
  // const backgroundLocation = location.state?.background;
  const state = location.state;
  const background = state?.background;

  // useEffect(() => {
  //   if (!ingredients.length) {
  //     dispatch(fetchIngredients());
  //   }
  //   if (!ordersFeed.length) {
  //     dispatch(fetchFeed());
  //   }
  // }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      (
      <>
        <Routes location={background || location}>
          <Route path='*' element={<NotFound404 />} />
          <Route path='/' element={<ConstructorPage />} />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => window.history.back()}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path='/feed' element={<Feed />} />
          <Route
            path=':number'
            element={
              <Modal
                title={'Детали заказа'}
                onClose={() => window.history.back()}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
          <Route
            path='/login'
            element={<Protected onlyUnAuth component={<Login />} />}
          />
          <Route
            path='/register'
            element={<Protected onlyUnAuth component={<Register />} />}
          />
          <Route
            path='/forgot-password'
            element={
              <Protected onlyUnAuth component={<ForgotPassword />} />
            }
          />
          <Route
            path='/reset-password'
            element={
              <Protected onlyUnAuth component={<ResetPassword />} />
            }
          />
          <Route
            path='/profile'
            element={<Protected component={<Profile />} />}
          />
          <Route
            path='/profile/orders/'
            element={<Protected component={<ProfileOrders />} />}
          />
          <Route
            path='/profile/orders/:number'
            element={<Protected component={<OrderInfo />} />}
          />
        </Routes>

      </>
      )
    </div>
  );
};

export default App;
