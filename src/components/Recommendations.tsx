import { useEffect, useState } from 'react';
import { searchMealsRecommendations } from '../services/Meals/ApiMeals';
import { searchDrinksRecommendations } from '../services/Drinks/ApiDrinks';
import styles from '../styles/Recommendations.module.css';
import CardRecommendations from './CardRecommendations';

function Recommendations() {
  const [recommendationsDrinks, setRecommendationsDrinks] = useState([
    {
      idDrink: '',
      strDrink: '',
      strDrinkThumb: '',
    },
  ]);
  const [recommendationsMeals, setRecommendationsMeals] = useState([
    {
      idMeal: '',
      strMeal: '',
      strMealThumb: '',
    },
  ]);

  useEffect(() => {
    if (window.location.pathname.includes('meal')) {
      searchMealsRecommendations()
        .then((response) => setRecommendationsMeals(response.meals.slice(0, 6)));
    } else {
      searchDrinksRecommendations()
        .then((response) => setRecommendationsDrinks(response.drinks.slice(0, 6)));
    }
  }, []);

  return (
    <div className={ styles.container }>
      { window.location.pathname.includes('meal')
       && recommendationsMeals.map(({ idMeal, strMeal, strMealThumb }, index) => (
         <CardRecommendations
           key={ idMeal }
           img={ strMealThumb }
           name={ strMeal }
           index={ index }
           url={ `/meals/${idMeal}` }
         />
       ))}
      {!window.location.pathname.includes('meal')
       && recommendationsDrinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
         <CardRecommendations
           key={ idDrink }
           img={ strDrinkThumb }
           name={ strDrink }
           index={ index }
           url={ `/drinks/${idDrink}` }
         />

       ))}
    </div>
  );
}

export default Recommendations;
