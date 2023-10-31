import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { searchMealsRecommendations } from '../services/Meals/ApiMeals';
import { searchDrinksRecommendations } from '../services/Drinks/ApiDrinks';
import styles from '../styles/Recommendations.module.css';
import CardRecommendations from './CardRecommendations';
import loadingIcon from '../images/spinner.svg';

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
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (window.location.pathname.includes('drinks')) {
      searchMealsRecommendations()
        .then((response) => {
          setRecommendationsMeals(response.meals.slice(0, 6));
          setIsLoading(false);
        });
    } else {
      searchDrinksRecommendations()
        .then((response) => {
          setRecommendationsDrinks(response.drinks.slice(0, 6));
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className={ styles.loading }>
        <img src={ loadingIcon } alt="loading" />
      </div>
    );
  }

  return (
    <div className={ styles.container }>
      { window.location.pathname.includes('drinks')
       && recommendationsMeals.map(({ idMeal, strMeal, strMealThumb }, index) => (
         <CardRecommendations
           key={ idMeal }
           img={ strMealThumb }
           name={ strMeal }
           index={ index }
           url={ `/meals/${idMeal}` }
         />
       ))}
      { window.location.pathname.includes('meals')
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
