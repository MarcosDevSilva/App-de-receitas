export default function Profile() {
  const userEmail: any = JSON.parse(localStorage.getItem('user')).email;
  return (
    <div>
      <div>
        <h1 data-testid="profile-email">{userEmail}</h1>
      </div>
      <div>
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button type="button" data-testid="profile-logout-btn">Logout</button>
      </div>
    </div>
  );
}
