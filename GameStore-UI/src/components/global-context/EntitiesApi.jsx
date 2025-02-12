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
}
