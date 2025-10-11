import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  reset,
  selectConstructor,
  selectConstructorItems
} from '../../services/slice/burgerConstructorSlice';
import { selectUser } from '../../services/slice/userSlice';
import {
  createOrder,
  selectOrderData,
  selectOrderRequest,
  updateOrderRequest
} from '../../services/slice/orderSlice';

export const BurgerConstructor: FC = () => {
  const bun = useSelector(selectConstructor);
  const items = useSelector(selectConstructorItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderData);

  const constructorItems = {
    bun,
    ingredients: items
  };

  const onOrderClick = async () => {
    const ingredientsIds = constructorItems.ingredients.map((item) => item._id);
    if (!user) {
      navigate('/login');
      return;
    }

    if (constructorItems.bun && constructorItems.ingredients.length) {
      dispatch(
        createOrder([
          constructorItems.bun._id,
          ...ingredientsIds,
          constructorItems.bun._id
        ])
      );
    }
  };

  const closeOrderModal = () => {
    if (orderModalData) {
      dispatch(reset());
      dispatch(updateOrderRequest());
    }
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
