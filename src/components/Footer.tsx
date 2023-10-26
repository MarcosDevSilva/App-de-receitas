import { NavLink } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from '../styles/Footer.module.css';

function Footer() {
  return (
    <div>
      <nav data-testid="footer" className={ styles.container }>
        <NavLink to="/drinks">
          <img
            src={ drinkIcon }
            alt="Drinks"
            data-testid="drinks-bottom-btn"
            className={ [styles.icon, styles.iconDrinks].join(' ') }
          />
        </NavLink>
        <NavLink to="/meals">
          <img
            src={ mealIcon }
            alt="Meals"
            data-testid="meals-bottom-btn"
            className={ styles.icon }
          />
        </NavLink>

      </nav>
    </div>
  );
}

export default Footer;
