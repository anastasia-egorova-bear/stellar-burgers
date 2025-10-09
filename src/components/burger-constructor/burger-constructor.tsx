import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectConstructor, selectConstructorItems } from '../../services/slice/burgerConstructorSlice';
import { selectUser } from '../../services/slice/userSlice';
// import { useSelector } from 'react-redux';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bun = useSelector(selectConstructor);
  const items = useSelector(selectConstructorItems)
  // const user = useSelector(selectUser);

    const constructorItems = {
    bun,
    ingredients: items
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };

  //   const onOrderClick = async () => {
  //   if (!user) {
  //     navigate('/login');
  //     return;
  //   }

  //   if (!constructorItems.bun || orderRequest || !constructorItems.ingredients)
  //     return;

  //   const ingredientIds = [
  //     constructorItems.bun._id,
  //     ...constructorItems.ingredients.map((item) => item._id),
  //     constructorItems.bun._id
  //   ];

  //   await dispatch(createOrder(ingredientIds));
  // };

    const closeOrderModal = () => {
    window.history.back();
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
