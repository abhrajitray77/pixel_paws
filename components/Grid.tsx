import { Game } from '@/gameTypes';
import React from 'react'
import GameCard from './GameCard';

interface Props {
    games: Game[],
  
  }
  
  function Grid({ games }: Props) {

    return (
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    );
  }

export default Grid