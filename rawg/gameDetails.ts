import { get } from './api';
import { Game } from '@/gameTypes';

interface Params {
  id?: number;
  slug?: string;
}

function gameDetails(params: Params): Promise<Game> {
  return get<Game>(`games/${params.id ? params.id : params.slug}? `);
}

export { gameDetails };
