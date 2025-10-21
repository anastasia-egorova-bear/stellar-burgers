import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect, useRef } from 'react';
import {
  fetchUserOrders,
  selectUserOrders
} from '../../services/slice/userSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const hasFetched = useRef(false);

  // useEffect(() => {
  //   if (!hasFetched.current)
  //   {dispatch(fetchUserOrders());
  //   hasFetched.current = true;}
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserOrders());
    hasFetched.current = true;
  }, [dispatch]);

  if (!orders) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
