import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

const App = () => (
  <Switch>
    <Route exact path='/' />
    <Route path='/ingredients' />
  </Switch>
);

export default App;
