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
  category: string;
};

function Icon({ category }: IconType) {
  let icon = '';

  if (window.location.pathname.includes('meals')) {
    switch (category) {
      case 'Dessert':
        icon = dessert;
        break;
      case 'Breakfast':
        icon = breakfast;
        break;
      case 'Chicken':
        icon = chicken;
        break;
      case 'Beef':
        icon = beef;
        break;
      case 'Goat':
        icon = goat;
        break;
      default:
        icon = meal;
        break;
    }
  } else {
    switch (category) {
      case 'Cocoa':
        icon = cocoa;
        break;
      case 'Ordinary drink':
        icon = ordinaryDrink;
        break;
      case 'Cocktail':
        icon = cocktail;
        break;
      case 'Shake':
        icon = shake;
        break;
      case 'Other/Unknown':
        icon = other;
        break;
      default:
        icon = drink;
        break;
    }
  }

  return (
    <img src={ icon } alt={ category } className={ styles.icon } />
  );
}

export default Icon;
