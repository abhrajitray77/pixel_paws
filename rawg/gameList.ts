import { get, ResponseSchema } from './api';
import { Game } from '@/gameTypes';

interface Params {
  page?: number,
  page_size?: number,
  dates?: string,
  ordering?: string,
}

function gameList(params?: Params): Promise<ResponseSchema<Game>> {
  return get<ResponseSchema<Game>>('games?');
}

export { gameList };