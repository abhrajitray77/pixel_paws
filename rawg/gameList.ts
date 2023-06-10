import { get, ResponseSchema } from './api';
import { Game } from '@/gameTypes';

interface Params {
  pageSize?: number,
  page?: number,
  dates?: string,
  ordering?: string,
  pageIndex: number,
}

const links = [
  {
    name: 'most popular',
    path: 'lists/popular?discover=true&page_size=50',
  },
  {
    name: 'new releases',
    path: 'lists/main?',
  }
]

function gameList(params?: Params): Promise<ResponseSchema<Game>> {
  return get<ResponseSchema<Game>>(`games/${links[params?.pageIndex!].path}&page-size=${params?.pageSize}&ordering=${params?.ordering}&page=${params?.page}`);
}

export { gameList };