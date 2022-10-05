/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const changeState = async (movieID, state, action) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/movies/${movieID}/${state}/${action}`
    });
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
