import dessert from '../images/dessert-icon.svg';
import breakfast from '../images/breakfast-icon.svg';
import chicken from '../images/chicken-icon.svg';
import goat from '../images/goat-icon.svg';
import beef from '../images/beef-icon.svg';
import meal from '../images/mealIcon.svg';
import drink from '../images/drinkIcon.svg';
import ordinaryDrink from '../images/ordinaryDrink-icon.svg';
import cocktail from '../images/cocktail-icon.svg';
import shake from '../images/shake-icon.svg';
import other from '../images/unknow-icon.svg';
import cocoa from '../images/cocoa-icon.svg';
import styles from '../styles/RecipeDetails.module.css';

type IconType = {
  // category: 'dessert' | 'breakfast' | 'chicken' | 'beef' | 'meal' | 'drink' |
  // 'ordinary drink' | 'cocktail' | 'shake' | 'other/unknow' | 'cocoa' | 'goat';
  category?: string;
};

function Icon({ category = '' }: IconType) {
  let icon = '';

  if (window.location.pathname.includes('meals')) {
    if (category.includes('Dessert')) {
      icon = dessert;
    } else if (category.includes('Breakfast')) {
      icon = breakfast;
    } else if (category.includes('Chicken')) {
      icon = chicken;
    } else if (category.includes('Beef')) {
      icon = beef;
    } else if (category.includes('Goat')) {
      icon = goat;
    } else {
      icon = meal;
    }
  } else if (category.includes('Cocoa')) {
    icon = cocoa;
  } else if (category.includes('Ordinary Drink')) {
    icon = ordinaryDrink;
  } else if (category.includes('Cocktail')) {
    icon = cocktail;
  } else if (category.includes('Shake')) {
    icon = shake;
  } else if (category.includes('Other / Unknown')) {
    icon = other;
  } else {
    icon = drink;
  }

  return (
    <img src={ icon } alt={ category } className={ styles.icon } />
  );
}

export default Icon;
