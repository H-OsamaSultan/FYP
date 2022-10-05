/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const passwordResetEmail = async data => {
  const spinner = document.querySelector('.spinner');
  try {
    spinner.classList.toggle('hidden');
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/forgotPassword',
      data
    });

    if (res.data.status === 'success') {
      spinner.classList.toggle('hidden');
      showAlert(
        'success',
        'We’ve emailed you a link you can use to reset your password.'
      );
    }
  } catch (err) {
    spinner.classList.toggle('hidden');
    showAlert('error', err.response.data.message);
  }
};
