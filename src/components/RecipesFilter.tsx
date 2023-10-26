import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchDrinksCategories } from '../services/Drinks/ApiDrinks';
import { searchMealsCategories } from '../services/Meals/ApiMeals';
import styles from '../styles/RecipesFilter.module.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { fetchCategoriesDrinks, fetchCategoriesMeals,
  fetchDrinksName,
  fetchMealsName } from '../redux/actions';
import { Dispatch } from '../types';

function RecipesFilter() {
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);
  const [categoriesToogle, setCategoriesToogle] = useState<string>('');

  const dispatch: Dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const categoriesName = e.currentTarget.name;
    handleToogle(categoriesName);
    // console.log(categoriesToogle);
    if (categoriesToogle === categoriesName) {
      setCategoriesToogle('');
      if (pathname === '/drinks') {
        return dispatch(fetchDrinksName(''));
      }
      if (pathname === '/meals') {
        return dispatch(fetchMealsName(''));
      }
    }
    // setCategoriesToogle({ [categoriesName]: true });
    if (pathname === '/drinks') {
      return (categoriesName === 'all')
        ? dispatch(fetchDrinksName(''))
        : dispatch(fetchCategoriesDrinks(categoriesName, 'categories'));
    }
    if (pathname === '/meals') {
      return (categoriesName === 'all')
        ? dispatch(fetchMealsName(''))
        : dispatch(fetchCategoriesMeals(categoriesName, 'categories'));
    }
  };

  const handleToogle = (categoriesName: string) => {
    setCategoriesToogle(categoriesName);
  };

  useEffect(() => {
    const getCategoriesDrinks = async () => {
      const categoriesData = await searchDrinksCategories();
      setCategories(categoriesData.drinks.slice(0, 5));
    };
    const getCategoriesMeals = async () => {
      const categoriesData = await searchMealsCategories();
      setCategories(categoriesData.meals.slice(0, 5));
    };
    if (pathname === '/drinks') {
      getCategoriesDrinks();
    }
    if (pathname === '/meals') {
      getCategoriesMeals();
    }
  }, [pathname]);

  return (
    <nav className={ styles.container }>
      <button
        className={ styles.button }
        onClick={ (e) => handleClick(e) }
        name="all"
        data-testid="All-category-filter"
      >
        <img
          src={ (pathname === '/drinks') ? drinkIcon : mealIcon }
          alt="ALL"
          className={ styles.icon }

        />
        ALL
      </button>
      { categories.map(({ strCategory }) => (
        <button
          className={ (categoriesToogle === strCategory)
            ? styles.buttonActive
            : styles.button }
          key={ strCategory }
          onClick={ (e) => handleClick(e) }
          name={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
        >
          <img
            src={ (pathname === '/drinks') ? drinkIcon : mealIcon }
            alt={ strCategory }
            className={ styles.icon }
          />
          {strCategory}

        </button>

      )) }
    </nav>
  );
}

export default RecipesFilter;
