import { Link } from 'react-router-dom';
import styles from '../styles/Card.module.css';

type CardType = {
  img: string;
  name: string;
  index: number;
  url: string;
};

function CardRecommendations({ img, name, index, url }: CardType) {
  return (
    <Link to={ url }>
      <div data-testid={ `${index}-recommendation-card` } className={ styles.card }>
        <img
          src={ img }
          alt={ name }
          className={ styles.img }
        />
        <h3
          data-testid={ `${index}-recommendation-title` }
          className={ styles.h3 }
        >
          { name }
        </h3>
      </div>
    </Link>
  );
}

export default CardRecommendations;
