const getGameDetails = async (id: string) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch game details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  export default getGameDetails;
  