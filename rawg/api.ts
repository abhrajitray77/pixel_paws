'use client'

const api = {
  url: "https://api.rawg.io/api/",
  key: process.env.RAWG_API_KEY!,
};

let req_count: number = 0;

// Create a cache object to store the API responses
const cache: { [endpoint: string]: any } = {};

interface ResponseSchema<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

async function get<T>(endpoint: string): Promise<T> {
  // Check if the response is already cached in local storage or memory
  if (cache[endpoint]) {
    console.log(`[RAWG] Returning cached response for ${endpoint}`);
    return cache[endpoint];
  }

  // Check if there is a cached value of the response in local storage
  const cachedData = localStorage.getItem(endpoint);
  if (cachedData) {
    console.log(`[RAWG] Retrieving cached response for ${endpoint}`);
    cache[endpoint] = JSON.parse(cachedData);
    return cache[endpoint];
  }

  const response = await fetch(`${api.url}${endpoint}&key=${api.key}`);

  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  req_count++;
  console.log(`[RAWG] Request #${req_count} to ${endpoint}`);

  // Cache the response for future use in local storage and memory
  cache[endpoint] = data;
  localStorage.setItem(endpoint, JSON.stringify(data));

  return data;
}

export type { ResponseSchema };
export { get };