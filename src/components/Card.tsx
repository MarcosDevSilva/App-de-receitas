import styles from '../styles/Card.module.css';

type CardType = {
  img: string;
  name: string;
  index: number;
};

function Card({ img, name, index }: CardType) {
  return (
    <div data-testid={ `${index}-recipe-card` } className={ styles.card }>
      <img
        src={ img }
        alt=""
        data-testid={ `${index}-card-img` }
        className={ styles.img }
      />
      <h3 data-testid={ `${index}-card-name` } className={ styles.h3 }>{ name }</h3>
    </div>
  );
}

export default Card;
