import React from 'react';
import { Link, Route } from 'react-router-dom';
import GamesPage from './containers/GamesPage';
import GameForm from './containers/GameForm';

const App = () => (
  <div className='ui container'>
    <div className='ui three item menu'>
      <Link className='item' activeonlywhenexact="true" to='/'>Home</Link>
      <Link className='item' activeonlywhenexact="true" to={'/games'}>Games</Link>
      <Link className='item' activeonlywhenexact="true" to='/games/new'>Add New Game</Link>
    </div>

    <Route exact path={'/games'} component={GamesPage} />
    <Route path={'/games/new'} component={GameForm} />
    <Route path={'/game/:_id'} component={GameForm} />
  </div>
);

export default App;
