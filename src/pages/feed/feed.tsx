import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeeds,
  selectFeedLoading,
  selectFeedOrders
} from '../../services/slice/feedSlice';
import {
  fetchIngredients,
  selectIngredients
} from '../../services/slice/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const ingredients = useSelector(selectIngredients);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current && !isLoading) {
      hasLoaded.current = true;
      dispatch(fetchFeeds());
    }
  }, []);
  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
      )}
    </>
  );
};
