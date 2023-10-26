import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  if (!localStorage.getItem('user')) {
    navigate('/');
  }

  const userEmail = JSON.parse(localStorage.getItem('user')).email;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <div>
        <h1 data-testid="profile-email">{userEmail}</h1>
      </div>
      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => { navigate('/done-recipes'); } }
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
