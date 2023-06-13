import { get, ResponseSchema } from './api';

export type GameDataType = {
    id?: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string; 
};


function genreList(): Promise<ResponseSchema<GameDataType>> {
  return get<ResponseSchema<GameDataType>>(`genres?`);
}

export { genreList };