import { NavLink } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import style from '../styles/Footer.module.css';

function Footer() {
  return (
    <div>
      <nav data-testid="footer" className={ style.container }>
        <NavLink to="/drinks">
          <img
            src={ drinkIcon }
            alt="Drinks"
            data-testid="drinks-bottom-btn"
            className={ style.icon }
          />
        </NavLink>
        <NavLink to="/meals">
          <img
            src={ mealIcon }
            alt="Meals"
            data-testid="meals-bottom-btn"
            className={ style.icon }
          />
        </NavLink>

      </nav>
    </div>
  );
}

export default Footer;
