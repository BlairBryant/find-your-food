import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/utilities.css';
import Home from './components/Home'
import Ingredients from './components/Ingredients'
import Recipes from './components/Recipes'

const App = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/ingredients' component={Ingredients}/>
    <Route path='/recipes' component={Recipes}/>
  </Switch>
);

export default App;