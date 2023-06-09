import { get, ResponseSchema } from './api';

export type Screenshot = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<ScreenshotItem>;
};

export type ScreenshotItem = {
  id: number;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
};

interface Params {
  slug: string,
}

function gameScreenshots(params: Params): Promise<Screenshot> {
  return get<Screenshot>(`games/${params.slug}/screenshots?`);
}

export { gameScreenshots };