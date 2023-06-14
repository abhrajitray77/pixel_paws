
import { get, ResponseSchema } from './api';
import { Game } from '@/gameTypes';

interface Params {
  pageSize?: number,
  page?: number,
  ordering?: string,
  genreSlug?: string,

}



function genreGames(params?: Params): Promise<ResponseSchema<Game>> {
  return get<ResponseSchema<Game>>(`games?discover=true&page-size=${params?.pageSize}&ordering=${params?.ordering}&page=${params?.page}&genres=${params?.genreSlug}`);
}

export { genreGames }; 