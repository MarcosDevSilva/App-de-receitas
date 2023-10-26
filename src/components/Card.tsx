import { Link } from 'react-router-dom';
import styles from '../styles/Card.module.css';

type CardType = {
  img: string;
  name: string;
  index: number;
  id: string;
};

function Card({ img, name, index, id }: CardType) {
  return (
    <Link to={ id }>
      <div data-testid={ `${index}-recipe-card` } className={ styles.card }>
        <img
          src={ img }
          alt={ name }
          data-testid={ `${index}-card-img` }
          className={ styles.img }
        />
        <h3 data-testid={ `${index}-card-name` } className={ styles.h3 }>{ name }</h3>
      </div>
    </Link>
  );
}

export default Card;
