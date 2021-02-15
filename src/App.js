import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/utilities.scss';
import Home from './components/Home';
import Ingredients from './components/Ingredients';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import FavoriteRecipes from './components/FavoriteRecipes';

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/ingredients' component={Ingredients} />
    <Route path='/recipes/:id' component={Recipe} />
    <Route path='/recipes' component={Recipes} />
    <Route path='/recipe/favorites' component={FavoriteRecipes} />
  </Switch>
);

export default App;