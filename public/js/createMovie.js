/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const createMovie = async movieID => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/movies/`,
      data: {
        movieID: movieID,
        watched: false,
        watchlist: false,
        liked: false
      }
    });
    return res.data;
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
