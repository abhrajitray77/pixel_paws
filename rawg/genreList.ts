import { get, ResponseSchema } from './api';

export type GameDataType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    id: number;
    name: string;
    slug: string;
    games_count?: number;
    image_background: string;
    description?: string; 
  }[];
};


function genreList(): Promise<GameDataType[]> {
  return get<GameDataType[]>(`genres?`);
}

export { genreList };