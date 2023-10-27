import { useNavigate } from 'react-router-dom';
import styles from './styles/Profile.module.css';
import doneRecipes from '../images/done-recipes.svg';
import favoriteRecipesIcon from '../images/favorite-icon.svg';
import logoutIcon from '../images/logoutIcon.svg';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const user = localStorage.getItem('user');
  const userJSON = user ? JSON.parse(user) : null;

  return (
    <div>
      <div>
        <h1
          data-testid="profile-email"
          className={ styles.email }
        >
          {userJSON && userJSON.email}
        </h1>
      </div>
      <div className={ styles.btnsContainer }>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => { navigate('/done-recipes'); } }
          className={ styles.doneRecipes }
        >
          <img src={ doneRecipes } className={ styles.logoDoneRecipes } alt="Logo" />
          <span className={ styles.spanBtn }>
            Done Recipes
          </span>
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => { navigate('/favorite-recipes'); } }
          className={ styles.favoriteRecipes }
        >
          <img
            src={ favoriteRecipesIcon }
            className={ styles.favRecipesIcon }
            alt="Logo"
          />
          <span className={ styles.spanBtn }>
            Favorite Recipes
          </span>
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
          className={ styles.logoutBtn }
        >
          <img
            src={ logoutIcon }
            className={ styles.logoutIcon }
            alt="Logo"
          />
          <span className={ styles.spanBtn }>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
