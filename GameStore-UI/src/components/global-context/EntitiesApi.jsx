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
