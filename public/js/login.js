/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password, signingup) => {
  const spinner = document.querySelector('.spinner');
  try {
    spinner.classList.toggle('hidden');
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      spinner.classList.toggle('hidden');
      if (signingup === true) {
      } else {
        showAlert('success', 'Logged in successfully!');
      }
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    spinner.classList.toggle('hidden');
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout'
    });
    if ((res.data.status = 'success'))
      window.location = 'http://127.0.0.1:3000';
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
