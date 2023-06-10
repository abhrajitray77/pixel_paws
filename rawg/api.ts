const api = {
    url: "https://api.rawg.io/api/",
    key: process.env.RAWG_API_KEY!,
  };

  let req_count: number = 0;
  
  interface ResponseSchema<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
  }
  
  async function get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${api.url}${endpoint}&key=${api.key}`);
  
    if (!response.ok) throw new Error(response.statusText);
  
    const data = await response.json();
    req_count++;
    console.log(`[RAWG] Request #${req_count} to ${endpoint}`);
    return data;
  }
  
  export type { ResponseSchema };
  export { get };
  