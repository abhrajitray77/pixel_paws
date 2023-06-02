import { Game } from '@/gameTypes';
import React from 'react'
import GameCard from './GameCard';

interface Props {
    games: Game[],
    columnsCount: number;
  }
  
  function Grid({ games, columnsCount }: Props) {
    const gamesPerColumn = Math.ceil(games.length / columnsCount);
    const columns = Array(columnsCount).fill(null).map((_, index) => {
      const gamesToDisplay = [];
      for (let i = 0; i < gamesPerColumn; i++) {
        const gameIndex = i * columnsCount + index;
        if (gameIndex < games.length) {
          gamesToDisplay.push(games[gameIndex]);
        }
      }
      return gamesToDisplay;
    });
  
    return (
      <div className="Grid">
        <>
          {columns.map((column, index) => (
            <div key={`column-${index}`} className="Column">
              {column.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                />
              ))}
            </div>
          ))}
        </>
      </div>
    );
  }

export default Grid