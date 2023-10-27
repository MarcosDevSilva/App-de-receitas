import styles from '../styles/DoneRecipesCard.module.css';
import shareIcon from '../images/shareIcon.svg';
import { DoneRecipesCardType } from '../types';

function DoneRecipesCard({ id, img, name, category,
  nationality, doneDate, tags, index, type }: DoneRecipesCardType) {
  const copyToClipboard = () => {
    const pathname = window.location.href;
    const url = `${pathname}/${type}s/${id}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <div className={ styles.container } id={ id }>
      <div>
        <img
          src={ img }
          alt={ name }
          className={ styles.img }
          data-testid={ `${index}-horizontal-image` }
        />
      </div>
      <div className={ styles.content }>
        <div className={ styles.header }>
          <div className={ styles.headercontent }>
            <h3
              className={ styles.title }
              data-testid={ `${index}-horizontal-name` }
            >
              { name }
            </h3>
            <p
              className={ styles.category }
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${nationality}-${category}`}
            </p>
          </div>
          <button
            className={ styles.sharebutton }
            onClick={ () => copyToClipboard() }
          >
            <img
              src={ shareIcon }
              alt="Share Recipe"
              className={ styles.icon }
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>

        </div>
        <p
          className={ styles.data }
          data-testid={ `${index}-horizontal-done-date` }
        >
          {`Done in: ${doneDate}` }

        </p>
        <ul className={ styles.listTags }>
          { tags.map((tag) => (
            <li
              key={ tag }
              className={ styles.tags }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </li>
          )) }
        </ul>
      </div>
    </div>
  );
}

export default DoneRecipesCard;
