import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Drinks from './pages/Drinks';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import MealsDetails from './pages/MealsDetails';
import DrinksDetails from './pages/DrinksDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="meals/:id" element={ <MealsDetails /> } />
      <Route path="drinks/:id" element={ <DrinksDetails /> } />
      <Route path="meals/:id/in-progress" element={ <Meals /> } />
      <Route path="drinks/:id/in-progress" element={ <Drinks /> } />
      <Route element={ <Layout /> }>
        <Route path="meals" element={ <Meals /> } />
        <Route path="drinks" element={ <Drinks /> } />
        <Route path="profile" element={ <Profile /> } />
        <Route path="done-recipes" element={ <DoneRecipes /> } />
        <Route path="favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
    </Routes>
  );
}

export default App;
