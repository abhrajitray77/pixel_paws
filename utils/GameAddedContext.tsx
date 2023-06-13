// GameAddedContext.tsx
import React, { createContext, useState } from 'react';

export type GameAddedContextType = {
  gameAdded: boolean;
  setGameAdded: (value: boolean) => void;
};

export const GameAddedContext = createContext<GameAddedContextType>({
  gameAdded: false,
  setGameAdded: () => {},
});

type GameAddedProviderProps = {
    children: React.ReactNode;
};

export const GameAddedProvider: React.FC<GameAddedProviderProps> = ({ children }) => {
  const [gameAdded, setGameAdded] = useState<boolean>(false);

  return (
    <GameAddedContext.Provider value={{ gameAdded, setGameAdded }}>
      {children}
    </GameAddedContext.Provider>
  );
};
