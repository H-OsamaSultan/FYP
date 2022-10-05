/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
import { login, logout } from './login';

export const signup = async (name, email, password, passwordConfirm) => {
  const spinner = document.querySelector('.spinner');
  try {
    spinner.classList.toggle('hidden');
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Account Created Successfully!');
      spinner.classList.toggle('hidden');
      login(email, password, true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    spinner.classList.toggle('hidden');
  }
};
