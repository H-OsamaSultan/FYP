/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const moviesList = document.querySelector('.film__list');

export const movieFilter = async (
  searchQuery,
  genre,
  rating,
  startYear,
  endYear,
  language,
  sortby
) => {
  try {
    let res;
    if (searchQuery != '') {
      res = await axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/movie?api_key=3718eda98708443cde931b20b81a12e0&query=${searchQuery}&page=1&include_adult=true`
      });
    } else {
      console.log('filter');
      res = await axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=3718eda98708443cde931b20b81a12e0&with_genres=${genre}&vote_average.gte=${rating}&with_original_language=${language}&sort_by=${sortby}&primary_release_date.gte=${startYear}&primary_release_date.lte=${endYear}`
      });
    }

    moviesList.innerHTML = '';
    for (let i = 0; i < 20; i++) {
      const resMovie = await axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${
          res.data.results[i].id
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
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
