import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import spinner from '../images/spinner.svg';
import styles from '../styles/Meals.module.css';
import { GlobalState } from '../types';

function Meals() {
  const { meals, loading } = useSelector((state: GlobalState) => state.revenues);
  const navigate = useNavigate();

  if (meals.length === 1) {
    navigate(`/meals/${meals[0].idMeal}`);
  }

  return (
    <div className={ styles.container }>
      <div className={ styles.list }>
        {loading && (
          <div className={ styles.loading }>
            <img src={ spinner } alt="loading]" />
          </div>
        )}
        { meals.length > 0
       && meals.map(({ strMeal, strMealThumb }, index) => (
         <Card
           key={ `${index} ${strMeal}` }
           index={ index }
           name={ strMeal }
           img={ strMealThumb }
         />
       )) }
      </div>
    </div>
  );
}

export default Meals;
