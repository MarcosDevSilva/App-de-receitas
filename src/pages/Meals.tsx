import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GlobalState, Dispatch } from '../types';
import Recipes from '../components/Recipes';
import { fetchMealsName } from '../redux/actions';

function Meals() {
  const { meals, loading } = useSelector((state: GlobalState) => state.revenues);
  const { drinks } = useSelector((state: GlobalState) => state.revenues);
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  if (meals.length === 1) {
    console.log(`/meals/${meals[0].idMeal}`);

    navigate(`/meals/${meals[0].idMeal}`);
  }

  useEffect(() => {
    dispatch(fetchMealsName(''));
  }, [dispatch]);

  return (
    <Recipes meal={ meals } loading={ loading } recipeType="meals" drink={ drinks } />
    // <div className={ styles.container }>
    //   <div className={ styles.list }>
    //     {loading && (
    //       <div className={ styles.loading }>
    //         <img src={ spinner } alt="loading" />
    //       </div>
    //     )}
    //     { meals.length > 0
    //    && meals.map(({ strMeal, strMealThumb }, index) => (
    //      <Card
    //        key={ `${index} ${strMeal}` }
    //        index={ index }
    //        name={ strMeal }
    //        img={ strMealThumb }
    //      />
    //    )) }
    //   </div>
    // </div>
  );
}

export default Meals;
