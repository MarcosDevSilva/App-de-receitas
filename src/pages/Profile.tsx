import { useNavigate } from 'react-router-dom';
import styles from './styles/Profile.module.css';

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
      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => { navigate('/done-recipes'); } }
          className={ styles.doneRecipes }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => { navigate('/favorite-recipes'); } }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>
    </div>
  );
}
