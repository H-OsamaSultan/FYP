/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const moviesList = document.querySelector('.film__list');
const searchBoxRec = document.querySelector('.search__input-rec');
const searchListRec = document.querySelector('.search-list-rec');

if (searchBoxRec) {
  searchListRec.addEventListener('click', e => {
    sendData(e.target.innerText);
  });
}
export const sendData = async data => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/recommendations/${data}`
    });

    if (res.data.status === 'success') {
      displayMovieRecommendations(res.data.data.data);
    //   showAlert('success', 'successfully!');
    }
  } catch (err) {
    // showAlert('error', err.response.data.message);
  }
};

function displayMovieList(matches) {
  searchListRec.innerHTML = '';
  for (let i = 0; i < 6; i += 1) {
    if (matches[i]) {
      const movieListItem = document.createElement('div');

      movieListItem.innerHTML = `
            <div class="search-list-item">
            ${matches[i].original_title}
        </div>
        `;
      searchListRec.appendChild(movieListItem);
    }
  }
}

// Load movies from JSON file
const loadRecList = async function(searchQuery) {
  const res = await fetch('../data/films.json');
  const list = await res.json();

  // Get matches to current textinput
  let matches = list.filter(movie => {
    // matches start of sentence based on the input, also contains the global and the case insensitive flags
    const regex = new RegExp(`^${searchQuery}`, 'gi');
    // return data that matches those
    return movie.original_title.match(regex);
  });
  displayMovieList(matches);
};

export const findMoviesRec = function() {
  const searchQuery = searchBoxRec.value.trim();
  if (searchQuery.length > 0) {
    searchListRec.classList.remove('hidden');
    loadRecList(searchQuery);
  } else {
    searchListRec.classList.add('hidden');
  }
};

export const displayMovieRecommendations = async movieIDs => {
  moviesList.innerHTML = '';
  for (let i = 0; i < movieIDs.length; i++) {
    try {
      const resMovie = await axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${
          movieIDs[i]
        }/images?api_key=3718eda98708443cde931b20b81a12e0`
      });
      if (resMovie.data.id && resMovie.data.posters.length > 0) {
        const movieListItem = document.createElement('div');

        movieListItem.innerHTML = `<a href="/movie/${resMovie.data.id}">
        <div class="film__item">
        <img class="film__img" src="https://image.tmdb.org/t/p/original/${
          resMovie.data.posters[0].file_path
        }"></div>
        </a>
        </div>`;
        moviesList.appendChild(movieListItem);
      }
    } catch (err) {
      //   showAlert('error', err.response.data.message);
    }
  }
};
