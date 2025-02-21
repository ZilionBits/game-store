import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { addGameByForm, addGenreByName, deleteGameByForm, editGameByForm, removeGenreByName } from './EntitiesApi';
import { useUserAuth } from '../authorization/UserAuth';

// const MAINAPI = 'http://localhost:8080/api/v1';

const MAINAPI = 'https://game-store-api-h91p.onrender.com/api/v1';

export const GlobalContext = createContext();

const AppContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [gamesData, setGamesData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [platformsData, setPlatformsData] = useState([]);
  const [basketItems, setBasketItems] = useState(new Set());
  const [itemsCount, setItemsCount] = useState(0);
  const { token } = useUserAuth();

  useEffect(() => {
    let cancel = false;

    const fetchGames = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios(`${MAINAPI}`);
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

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios(`${MAINAPI}/genres`);
      setGenresData(response.data);
    };
    fetchGenres();

    const fetchPlatforms = async () => {
      const response = await axios(`${MAINAPI}/platforms`);
      setPlatformsData(response.data);
    };
    fetchPlatforms();
  }, []);

  useEffect(() => {
    let count = basketItems.size;
    setItemsCount(count);
  }, [basketItems]);

  const addToBasket = (id) => {
    const item = gamesData.find((game) => game.id === id);
    if (!item) {
      return;
    }
    setBasketItems((bsk) => new Set(bsk).add(item));
  };

  const removeBasketItem = (id) => {
    setBasketItems((bsk) => {
      const newSet = new Set(bsk);
      const itemToRemove = [...newSet].find((item) => item.id === id);

      if (itemToRemove) {
        newSet.delete(itemToRemove);
      }

      return newSet;
    });
  };

  const removeGenre = async (genre) => {
    try {
      const response = await removeGenreByName(MAINAPI, genre, token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const addGenre = async (genre) => {
    try {
      const response = await addGenreByName(MAINAPI, genre, token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const addGame = async (gameAddForm) => {
    try {
      const response = await addGameByForm(MAINAPI, gameAddForm, token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const deleteGame = async (gameData) => {
    deleteGameByForm(MAINAPI, gameData, token);
  };

  const editGame = async (gameAddForm) => {
    editGameByForm(MAINAPI, gameAddForm, token); 
  }

  const globalData = {
    itemsCount,
    addToBasket,
    setBasketItems,
    basketItems,
    removeBasketItem,
    removeGenre,
    addGenre,
    gamesData,
    addGame,
    deleteGame,
    editGame,
    genresData,
    platformsData,
    isLoading,
    isError,
  };

  return <GlobalContext.Provider value={globalData}>{children}</GlobalContext.Provider>;
};

export default AppContext;
