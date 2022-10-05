/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateReview = async (movieID, review) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/reviews/updatereview/${movieID}`,
      data: {
        review
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Review updated successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
