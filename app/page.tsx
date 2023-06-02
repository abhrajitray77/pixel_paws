import { useEffect, useState } from 'react';
import GameCard from '@/components/GameCard';
import getGameDetails from '@/rawg/gameDetails';
import { Game } from '@/gameTypes';

export default function Home() {
  let gameDetails: Game;

  getGameDetails('3498').then((data) => {
    gameDetails = data;
    console.log(gameDetails);
  });

  return (
    <main className="text-white">
{/*       <div className="flex flex-wrap justify-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            got response
          </div>
        )}
      </div> */}
    </main>
  );
}
