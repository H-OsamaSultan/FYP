/* eslint-disable */

const searchBox = document.querySelector('.search__input');
const searchList = document.querySelector('.search-list');

function displayMovieList(movies) {
  searchList.innerHTML = '';
    for (let i = 0; i < 6; i += 1) {
        if (movies[i]) {
            const movieLink = document.createElement('a');
            movieLink.href = `/movie/${movies[i].id}`;
            const movieListItem = document.createElement('div');
            movieListItem.dataset.id = movies[i].id; // setting movie id in  data-id
            movieListItem.classList.add('search-list-item');
            let moviePoster;
            if (movies[i].poster_path !== null) {
                moviePoster = `https://image.tmdb.org/t/p/w154${movies[i].poster_path}`;

                movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].title}</h3>
            <p>${movies[i].release_date.split('-')[0]}</p>
        </div>
        `;
            }
            else {
                movieListItem.dataset.id = null;
                movieListItem.classList.remove('search-list-item');
                movieListItem.innerHTML = ``;
            }
            movieLink.appendChild(movieListItem);
            searchList.appendChild(movieLink);
        }
    }
}

// Load movies from API
export const loadMovies = async function(searchQuery) {
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=3718eda98708443cde931b20b81a12e0&query=${searchQuery}&page=1&include_adult=true`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  displayMovieList(data.results);
};

export const findMovies = function() {
  const searchQuery = searchBox.value.trim();
  if (searchQuery.length > 0) {
    searchList.classList.remove('hidden');
    loadMovies(searchQuery);
  } else {
    searchList.classList.add('hidden');
  }
};
