import styles from './ingredients-category.module.css';
import { forwardRef } from 'react';
import { TIngredientsCategoryUIProps } from './type';
import { BurgerIngredient } from '@components';

export const IngredientsCategoryUI = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryUIProps
>(({ title, titleRef, ingredients, ingredientsCounters }, ref) => {
  const getDataCy = () => {
    if (title === 'Булки') return 'ingredient-category-buns';
    if (title === 'Начинки') return 'ingredient-category-mains';
    if (title === 'Соусы') return 'ingredient-category-sauces';
    return 'ingredient-category';
  };

  return (
    <>
      <h3
        className='text text_type_main-medium mt-10 mb-6'
        ref={titleRef}
        data-cy={getDataCy()}
      >
        {title}
      </h3>
      <ul className={styles.items} ref={ref}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            ingredient={ingredient}
            key={ingredient._id}
            count={ingredientsCounters[ingredient._id]}
            data-cy='ingredient-item'
          />
        ))}
      </ul>
    </>
  );
});
