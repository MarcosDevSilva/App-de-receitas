import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Dispatch, GlobalState } from '../types';
import Recipes from '../components/Recipes';
import { fetchDrinksName } from '../redux/actions';

function Drinks() {
  const { drinks, meals, loading,
    caller } = useSelector((state: GlobalState) => state.revenues);
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  if (drinks.length === 1 && caller !== 'categories') {
    navigate(`/drinks/${drinks[0].idDrink}`);
  }

  useEffect(() => {
    dispatch(fetchDrinksName(''));
  }, [dispatch]);

  return (
    <Recipes drink={ drinks } loading={ loading } recipeType="drinks" meal={ meals } />
  );
}

export default Drinks;
