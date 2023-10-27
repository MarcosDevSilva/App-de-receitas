import styles from '../styles/Recipes.module.css';
import Card from './Card';
import spinner from '../images/spinner.svg';
import { RecipesType } from '../types';
import RecipesFilter from './RecipesFilter';

function Recipes({ drink, meal, loading, recipeType } : RecipesType) {
  return (
    <div className={ styles.container }>
      <RecipesFilter />
      <div className={ styles.list }>
        {loading && (
          <div className={ styles.loading }>
            <img src={ spinner } alt="loading" />
          </div>
        )}
        { (recipeType === 'meals') ? (

          meal.length > 0 && meal
            .map(({ strMeal, strMealThumb, idMeal }, index) => (
              <Card
                key={ idMeal }
                index={ index }
                name={ strMeal }
                img={ strMealThumb }
                id={ idMeal }
              />
            )))
          : (drink.length > 0 && drink
            .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
              <Card
                key={ idDrink }
                index={ index }
                name={ strDrink }
                img={ strDrinkThumb }
                id={ idDrink }
              />)))}
      </div>
    </div>
  );
}

export default Recipes;
