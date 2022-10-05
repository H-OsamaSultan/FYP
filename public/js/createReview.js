/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const createReview = async (movieID, review) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/movies/${movieID}/reviews`,
      data: {
        review
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Review added successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
