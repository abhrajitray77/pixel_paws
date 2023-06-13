import { get, ResponseSchema } from './api';

export type GameDataType = {
  id?: number;
  name: string;
  slug: string;
  description: string;
  games_count: number;
  image_background: string;
  count: number;
  next: string;
  previous: string;
  results: {
    id?: number;
    name: string;
    slug: string;
    description: string;
    games_count: number;
    image_background: string;
  };
};


function genreList(): Promise<GameDataType[]> {
  return get<GameDataType[]>(`genres?`);
}

export { genreList };