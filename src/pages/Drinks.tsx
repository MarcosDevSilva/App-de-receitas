import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Drinks.module.css';
import spinner from '../images/spinner.svg';
import Card from '../components/Card';
import { GlobalState } from '../types';

function Drinks() {
  const { drinks, loading } = useSelector((state: GlobalState) => state.revenues);
  const navigate = useNavigate();

  if (drinks.length === 1) {
    navigate(`/drinks/${drinks[0].idDrink}`);
  }

  return (
    <div className={ styles.container }>
      <div className={ styles.list }>
        {loading && (
          <div className={ styles.loading }>
            <img src={ spinner } alt="loading" />
          </div>
        )}
        { drinks.length > 0
       && drinks.map(({ strDrink, strDrinkThumb }, index) => (
         <Card
           key={ `${index} ${strDrink}` }
           index={ index }
           name={ strDrink }
           img={ strDrinkThumb }
         />
       )) }
      </div>
    </div>
  );
}

export default Drinks;
