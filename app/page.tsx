import { useEffect, useState } from 'react';
import GameCard from '@/components/GameCard';
import getGameDetails from '@/rawg/gameDetails';
import { Game } from '@/gameTypes';

export default async function Home() {
  let gameDetails = {} as Game;

  await getGameDetails('3498').then((data) => {
    gameDetails = data;
  });

  return (
    <main className="text-white">
      <div>
        <GameCard game={gameDetails} />
      </div>
    </main>
  );
}
