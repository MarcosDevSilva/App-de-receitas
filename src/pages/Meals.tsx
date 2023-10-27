import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GlobalState, Dispatch } from '../types';
import Recipes from '../components/Recipes';
import { fetchMealsName } from '../redux/actions';

function Meals() {
  const { drinks, meals,
    loading, caller } = useSelector((state: GlobalState) => state.revenues);
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  if (meals.length === 1 && caller !== 'categories') {
    console.log(`/meals/${meals[0].idMeal}`);

    navigate(`/meals/${meals[0].idMeal}`);
  }

  useEffect(() => {
    dispatch(fetchMealsName(''));
  }, [dispatch]);

  return (
    <Recipes meal={ meals } loading={ loading } recipeType="meals" drink={ drinks } />
  );
}

export default Meals;
