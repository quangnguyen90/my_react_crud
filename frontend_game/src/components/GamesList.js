import React from 'react';
import GameCard from './GameCard';

const GamesList = ({games, deleteGame}) => (
    <div>
        {games.length === 0 ?
        <p>There are no games yet in your collection</p>
        :
        <div className="ui four cards">
            {games.map((game, index) => <GameCard key={index} game={game} deleteGame={deleteGame}/>)}
        </div>
        }
    </div>
)

export default GamesList;