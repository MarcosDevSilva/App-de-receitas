import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from '../styles/DoneRecipesCard.module.css';
import shareIcon from '../images/shareIcon.svg';
import { DoneRecipesCardType } from '../types';

function DoneRecipesCard({ id, img, name, category,
  nationality, doneDate, tags, index, type, alcoholicOrNot }: DoneRecipesCardType) {
  const [shared, setShared] = useState(false);

  const copyToClipboard = () => {
    const pathname = window.location.host;
    const url = `http://${pathname}/${type}s/${id}`;
    navigator.clipboard.writeText(url);
    setShared((prevState) => !prevState);
  };

  return (
    <div className={ styles.container } id={ id }>
      <div>
        <Link to={ `../${type}s/${id}` }>
          <img
            src={ img }
            alt={ name }
            className={ styles.img }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
      </div>
      <div className={ styles.content }>
        <div className={ styles.header }>
          <div className={ styles.headercontent }>

            <Link
              to={ `../${type}s/${id}` }
              className={ styles.title }
              data-testid={ `${index}-horizontal-name` }
            >
              { name }
            </Link>

            { (type === 'meal') && (
              <p
                className={ styles.category }
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${nationality} - ${category}`}
              </p>
            )}

            { (type === 'drink') && (
              <p
                className={ styles.category }
                data-testid={ `${index}-horizontal-top-text` }
              >
                {alcoholicOrNot}
              </p>
            )}
          </div>
          <button
            className={ styles.sharebutton }
            onClick={ () => copyToClipboard() }
          >
            {!shared && <img
              src={ shareIcon }
              alt="Share Recipe"
              className={ styles.icon }
              data-testid={ `${index}-horizontal-share-btn` }
            />}
            {shared && <p className={ styles.copied }>Link copied!</p>}
          </button>

        </div>
        <p
          className={ styles.data }
          data-testid={ `${index}-horizontal-done-date` }
        >
          {`Done in: ${doneDate}` }
        </p>
        { (type === 'meal') && (
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
        )}
      </div>
    </div>
  );
}

export default DoneRecipesCard;
