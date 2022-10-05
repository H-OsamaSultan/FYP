/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const passwordReset = async data => {
  const spinner = document.querySelector('.spinner');
  try {
    spinner.classList.toggle('hidden');
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/users${data.resetUrl}/reset`,
      data
    });

    if (res.data.status === 'success') {
      spinner.classList.toggle('hidden');
      showAlert('success', 'Your password has been reset!');
    }
  } catch (err) {
    spinner.classList.toggle('hidden');
    showAlert('error', err.response.data.message);
  }
};
