import axios from 'axios';

export const removeGenreByName = async (mainApi, genre, token) => {
  try {
    const response = await axios.delete(`${mainApi}/genres?genre=${genre}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const addGenreByName = async (mainApi, genre, token) => {
  try {
    const response = await axios.post(`${mainApi}/genres?genre=${genre}`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const addGameByForm = async (mainApi, gameAddForm, token) => {
  try {
    const response = await axios.post(mainApi, gameAddForm, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteGameByForm = async (mainApi, gameData, token) => {
  try {
    const response = await axios.delete(mainApi, {
      headers: { Authorization: `Bearer ${token}` },
      data: gameData,
    });
    return console.log(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
};

export const editGameByForm = async (mainApi, gameAddForm, token) => {
  try {
    const response = await axios.put(mainApi, gameAddForm, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return console.log(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
};
