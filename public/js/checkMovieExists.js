/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const checkMovieExists = async movieID => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/movies/checkmovie/${movieID}`
    });
    return res.data;
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
