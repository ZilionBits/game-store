import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const GAMESAPI = 'http://localhost:8080/api/v1';

export const GlobalContext = createContext();

const AppContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    let cancel = false;

    const fetchGames = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios(`${GAMESAPI}`);
        if (!cancel) setGamesData(response.data);
      } catch (error) {
        if (!cancel) setIsError(true);
      }
      setIsLoading(false);
    };

    fetchGames();

    return () => {
      cancel = true;
    };
  }, []);

  const globalData = { gamesData, isLoading, isError };

  return <GlobalContext.Provider value={globalData}>{children}</GlobalContext.Provider>;
};

export default AppContext;
