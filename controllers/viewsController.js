const axios = require('axios');
const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

const loadMovie = async id => {
  const res = await axios({
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}?api_key=3718eda98708443cde931b20b81a12e0&language=en-US`
  });

  return res.data;
};

const loadCredits = async id => {
  const res = await axios({
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=3718eda98708443cde931b20b81a12e0&language=en-US`
  });
  return res.data;
};

const getTrailer = async id => {
  const res = await axios({
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3718eda98708443cde931b20b81a12e0&language=en-US`
  });
  return res.data;
};

exports.home = catchAsync(async (req, res, next) => {
  res.status(200).render('home');
});

exports.getMovie = catchAsync(async (req, res, next) => {
  let movie = null;
  if (req.user) {
    movie = await Movie.findOne({
      user: req.user.id,
      movieID: req.params.id
    }).populate({
      path: 'reviews',
      fields: 'review user' //rating no longer here remove later
    });
  }
  let reviews = null;
  reviews = await Review.find({
    movie: req.params.id
  });
  let rating = null;
  if (movie) {
    // eslint-disable-next-line prefer-destructuring
    rating = movie.rating;
  }

  const movieData = await loadMovie(req.params.id);
  const movieCredits = await loadCredits(req.params.id);
  const movieTrailer = await getTrailer(req.params.id);

  res.status(200).render('movie', {
    movie,
    movieData,
    movieCredits,
    movieTrailer,
    reviews,
    rating
  });
});

exports.getWatchedMovies = catchAsync(async (req, res, next) => {
  let movies = null;
  if (req.user) {
    movies = await Movie.find({
      user: req.user.id,
      watched: true
    });
  }

  const moviePosters = [];
  /* eslint-disable no-plusplus */
  for (let i = 0; i < movies.length; i++) {
    /* eslint-disable no-await-in-loop */
    const response = await axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${
        movies[i].movieID
      }/images?api_key=3718eda98708443cde931b20b81a12e0`
    });
    moviePosters.push(response.data.posters[0]);
  }
  const watched = true;
  res.status(200).render('watch', {
    movies,
    moviePosters,
    watched
  });
});
exports.getWatchlistMovies = catchAsync(async (req, res, next) => {
  let movies = null;
  if (req.user) {
    movies = await Movie.find({
      user: req.user.id,
      watchlist: true
    });
  }
  const moviePosters = [];
  for (let i = 0; i < movies.length; i++) {
    /* eslint-disable no-await-in-loop */
    const response = await axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${
        movies[i].movieID
      }/images?api_key=3718eda98708443cde931b20b81a12e0`
    });
    moviePosters.push(response.data.posters[0]);
  }
  const watchlist = true;
  res.status(200).render('watch', {
    movies,
    moviePosters,
    watchlist
  });
});

exports.getMovieFilter = catchAsync(async (req, res, next) => {
  res.status(200).render('movieFilter');
});
exports.getRecommendations = catchAsync(async (req, res, next) => {
  res.status(200).render('recommendations');
});

exports.getPasswordResetEmail = (req, res) => {
  res.status(200).render('passwordResetEmail', {
    title: 'Reset Password'
  });
};
exports.resetPassword = (req, res) => {
  res.status(200).render('passwordResetForm', {
    title: 'Reset Password',
    url: req.url
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
