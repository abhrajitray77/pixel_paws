const api = {
    url: "https://api.rawg.io/api/",
    key: process.env.RAWG_API_KEY,
  };
  
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
  
    return data;
  }
  
  export type { ResponseSchema };
  export { get };
  