import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const GAMESAPI = 'http://localhost:8080/api/v1';

export const GlobalContext = createContext();

const AppContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [gamesData, setGamesData] = useState([]);
  const [basketItems, setBasketItems] = useState(new Set());
  const [itemsCount, setItemsCount] = useState(0);

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

  const globalData = { itemsCount, addToBasket, setBasketItems, basketItems, removeBasketItem, gamesData, isLoading, isError };

  return <GlobalContext.Provider value={globalData}>{children}</GlobalContext.Provider>;
};

export default AppContext;
