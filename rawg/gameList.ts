import { get, ResponseSchema } from './api';
import { Game } from '@/gameTypes';

interface Params {
  pageSize?: number,
  page?: number,
  dates?: string,
  ordering?: string,
  genreSlug?: string,
  pageIndex: number,
}

const links = [
  {
    name: 'most popular',
    path: 'games/lists/popular?discover=true',
  },
  {
    name: 'new releases',
    path: 'games/lists/main?',
  },
  {
    name: 'genreGames',
    path: `games?discover=true`,
  }
]

function gameList(params?: Params): Promise<ResponseSchema<Game>> {
  return get<ResponseSchema<Game>>(`${links[params?.pageIndex!].path}&page-size=${params?.pageSize}&ordering=${params?.ordering}&page=${params?.page}&genres=${params?.genreSlug}`);
}

export { gameList };