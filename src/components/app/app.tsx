import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useEffect } from 'react';
import {
  fetchIngredients,
  selectIngredients
} from '../../services/slice/ingredientsSlice';
import { useDispatch, useSelector } from '../../services/store';
import { checkUserAuth } from '../../services/slice/userSlice';
import { Protected } from '../protected-route/protectedRoute';
import { fetchFeeds, selectFeedOrders } from '../../services/slice/feedSlice';

const App = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const ordersFeed = useSelector(selectFeedOrders);
  const location = useLocation();
  const state = location.state;
  const background = state?.background;
  const navigate = useNavigate();

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
    if (!ordersFeed.length) {
      dispatch(fetchFeeds());
    }
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <>
        <Routes location={background || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
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
            element={<Protected onlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path='/reset-password'
            element={<Protected onlyUnAuth component={<ResetPassword />} />}
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
          <Route path='*' element={<NotFound404 />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal
                  title={'Описание ингредиента'}
                  onClose={() => navigate(-1)}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/feed/:number'
              element={
                <Modal title={''} onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title={``} onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Routes>
        )}
      </>
    </div>
  );
};

export default App;
