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

type IconType = {
  // category: 'dessert' | 'breakfast' | 'chicken' | 'beef' | 'meal' | 'drink' |
  // 'ordinary drink' | 'cocktail' | 'shake' | 'other/unknow' | 'cocoa' | 'goat';
  category: string;
};

function Icon({ category }: IconType) {
  let icon = '';

  if (window.location.pathname.includes('meals')) {
    switch (category) {
      case 'dessert':
        icon = dessert;
        break;
      case 'breakfast':
        icon = breakfast;
        break;
      case 'chicken':
        icon = chicken;
        break;
      case 'beef':
        icon = beef;
        break;
      case 'goat':
        icon = goat;
        break;
      default:
        icon = meal;
        break;
    }
  } else {
    switch (category) {
      case 'cocoa':
        icon = cocoa;
        break;
      case 'ordinary drink':
        icon = ordinaryDrink;
        break;
      case 'cocktail':
        icon = cocktail;
        break;
      case 'shake':
        icon = shake;
        break;
      case 'other/unknow':
        icon = other;
        break;
      default:
        icon = drink;
        break;
    }
  }

  return (
    <div>
      <img src={ icon } alt="icon" />
    </div>
  );
}

export default Icon;
