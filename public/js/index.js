/* eslint-disable */
import '@babel/polyfill';
// import { displayMap } from './mapbox';
import { login, logout } from './login';
import { signup } from './signup';
import { updateSettings } from './updateSettings';
import { loadPosters } from './home';
import { closeModal } from './home';
import { findMovies } from './search';
import { findMoviesRec } from './recommendation';
import { changeState } from './action';
import { createMovie } from './createMovie';
import { createReview } from './createReview';
import { updateReview } from './updateReview';
import { checkReviewExists } from './checkReviewExists';
import { checkMovieExists } from './checkMovieExists';
import { passwordResetEmail } from './passwordResetEmail';
import { passwordReset } from './passwordReset';
import { movieFilter } from './movieFilter';

// DOM ELEMENTS
const loginForm = document.querySelector('.form-login');
const signupForm = document.querySelector('.form-signup');
const logOutBtn = document.querySelector('.logout-btn');
const userDataForm = document.querySelector('.form-user-data');
const resetRequestEmailForm = document.querySelector(
  '.form-reset-request-email'
);
const resetPasswordForm = document.querySelector('.form-reset-password');

const userPasswordForm = document.querySelector('.form-user-password');
const featuredImg = document.querySelectorAll('.featured__img');
const searchBox = document.querySelector('.search__input');
const searchBoxRec = document.querySelector('.search__input-rec');
const searchList = document.querySelector('.search-list');
const searchListRec = document.querySelector('.search-list-rec');
const watchedBtn = document.querySelector('.watched');
const likedBtn = document.querySelector('.liked');
const watchlistBtn = document.querySelector('.watchlist');
const iconWatched = document.querySelector('.icon-watched');
const iconLiked = document.querySelector('.icon-liked');
const iconWatchlist = document.querySelector('.icon-watchlist');
const details = document.querySelector('.details');
const ratings = document.querySelector('.rating-group');
const submitReviewBtn = document.querySelector('.Rev_btn');
const ratingNone = document.querySelector('.rating--none');
const header = document.querySelector('.header');
const filmHeader = document.querySelector('.film__header');
const btnMovieFilter = document.querySelector('.btn-movie-filter');
const filterOptions = document.getElementsByTagName('select');
const filterInput = document.querySelector('.search-term-input');

if (btnMovieFilter) {
  btnMovieFilter.addEventListener('click', e => {
    const searchQuery = filterInput.value;
    const genre =
      filterOptions[0].options[filterOptions[0].selectedIndex].value;
    const rating =
      filterOptions[1].options[filterOptions[1].selectedIndex].value;
    const startYear =
      filterOptions[2].options[filterOptions[2].selectedIndex].value;
    const endYear = String(Number(startYear.split('-')[0]) + 9) + '-01-01';
    const language =
      filterOptions[3].options[filterOptions[3].selectedIndex].value;
    const sortby =
      filterOptions[4].options[filterOptions[4].selectedIndex].value;

    movieFilter(
      searchQuery,
      genre,
      rating,
      startYear,
      endYear,
      language,
      sortby
    );
  });
}
const changeRating = () => {
  const rate = JSON.parse(ratings.dataset.rate);
  const ratingChecked = document.getElementById(`rating-${rate}`);
  ratingChecked.checked = true;
};
if (ratings) {
  //if on a newly loaded movie there is no rating then in that
  //case rating should not be displayed as its already 0 which is the default case
  if (ratings.dataset.rate !== 'null' && ratings.dataset.rate !== 'undefined') {
    changeRating();
  }

  ratings.addEventListener('mouseover', e => {
    ratingNone.style.opacity = 1;
  });

  ratings.addEventListener('mouseout', e => {
    ratingNone.style.opacity = 0;
  });

  ratings.addEventListener('change', async e => {
    const movieID = JSON.parse(details.dataset.movieid);
    const status = await checkMovieExists(movieID);
    if (!status.data.exists) {
      createMovie(movieID);
    }
    changeState(movieID, e.target.value, 'rating');
  });
}
if (submitReviewBtn) {
  submitReviewBtn.addEventListener('click', async e => {
    closeModal();
    e.preventDefault();

    const movieID = JSON.parse(details.dataset.movieid);
    const status = await checkMovieExists(movieID);
    const review = document.getElementById('text_area').value;
    let movieData;
    if (!status.data.exists) {
      movieData = await createMovie(movieID);
      createReview(movieData.data.data.movieID, review);
    } else {
      const reviewStatus = await checkReviewExists(movieID);

      if (!reviewStatus.data.exists) {
        createReview(movieID, review);
      } else {
        updateReview(movieID, review);
      }
    }
  });
}

if (filmHeader) {
  header.style.backgroundImage = `linear-gradient(90deg, #14181c 0%, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 0) 85%, #14181c 100%), linear-gradient(0deg, #14181c 0%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 80%, rgba(0, 0, 0, 0.5) 100%), url(${
    filmHeader.dataset.moviebackdrop
  })`;
}
if (watchedBtn) {
  watchedBtn.addEventListener('click', async () => {
    const movieID = JSON.parse(details.dataset.movieid);
    const status = await checkMovieExists(movieID);
    if (!status.data.exists) {
      createMovie(movieID);
    }

    if (iconWatched.classList.contains('fill')) {
      changeState(movieID, false, 'watched');
      document.querySelector('.watched-para').innerText = 'Watch';
    } else {
      changeState(movieID, true, 'watched');
      document.querySelector('.watched-para').innerText = 'Watched';
    }

    iconWatched.classList.toggle('fill');
  });
}
if (likedBtn) {
  likedBtn.addEventListener('click', async () => {
    const movieID = JSON.parse(details.dataset.movieid);
    const status = await checkMovieExists(movieID);
    if (!status.data.exists) {
      createMovie(movieID);
    }
    if (iconLiked.classList.contains('fill')) {
      changeState(movieID, false, 'liked');
    } else {
      changeState(movieID, true, 'liked');
    }
    iconLiked.classList.toggle('fill');
  });
}
if (watchlistBtn) {
  watchlistBtn.addEventListener('click', async () => {
    const movieID = JSON.parse(details.dataset.movieid);
    const status = await checkMovieExists(movieID);
    if (!status.data.exists) {
      createMovie(movieID);
    }
    if (iconWatchlist.classList.contains('fill')) {
      changeState(movieID, false, 'watchlist');
    } else {
      changeState(movieID, true, 'watchlist');
    }
    iconWatchlist.classList.toggle('fill');
  });
}

if (signupForm)
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm')
      .value;
    signup(name, email, password, passwordConfirm);
  });

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    login(email, password, false);
  });

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (resetRequestEmailForm)
  resetRequestEmailForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    passwordResetEmail({ email });
  });
if (resetPasswordForm)
  resetPasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    const resetUrl = document.getElementById('resetUrl').value;
    passwordReset({ password, passwordConfirm, resetUrl });
  });

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (featuredImg.length > 0) {
  loadPosters();
}

if (searchBox) {
  searchBox.addEventListener('keyup', function() {
    findMovies();
  });
  searchBox.addEventListener('click', function() {
    findMovies();
  });
  window.addEventListener('click', event => {
    if (event.target.className !== 'search__input') {
      searchList.classList.add('hidden');
    }
  });
}

if (searchBoxRec) {
  searchBoxRec.addEventListener('keyup', function() {
    findMoviesRec();
  });
  searchBoxRec.addEventListener('click', function() {
    findMoviesRec();
  });
  window.addEventListener('click', event => {
    if (event.target.className !== 'search__input-rec') {
      searchListRec.classList.add('hidden');
    }
  });
}
